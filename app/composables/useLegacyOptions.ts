import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  toRef,
  watch
} from 'vue'
import { useAppStore } from '~/stores/app'

function normalizeHead (head: any) {
  if (!head) return {}
  const result = { ...head }
  if (Array.isArray(result.meta)) {
    result.meta = result.meta.map((meta: any) => {
      if (!meta.hid) return meta
      const { hid, ...rest } = meta
      return { ...rest, key: hid }
    })
  }
  return result
}

function readPath (target: any, path: string) {
  return path.split('.').reduce((value, key) => value?.[key], target)
}

/**
 * Keeps less-used Vue 2 option hooks working while a page is being rewritten
 * to setup syntax. All state and hooks are registered with Vue 3 composables.
 */
export function useLegacyOptions (options: any, props: Record<string, any> = {}) {
  const instance = getCurrentInstance()
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  const getRoute = () => router.currentRoute.value
  const store = useAppStore()
  const state = reactive<Record<string, any>>({})
  const computedValues: Record<string, any> = {}
  const methods: Record<string, Function> = {}
  const getLegacySlots = () => Object.fromEntries(
    Object.entries(instance?.slots || {}).map(([name, slot]: [string, any]) => [
      name,
      typeof slot === 'function'
        ? slot().map((node: any) => ({
            ...node,
            text: typeof node.children === 'string' ? node.children : undefined,
            tag: typeof node.type === 'string' ? node.type : undefined,
            elm: node.el
          }))
        : []
    ])
  )

  const vm = new Proxy(Object.create(null), {
    get (_target, key: string) {
      // Nuxt rewrites `this.$route` into
      // `this._.provides[PageRouteSymbol] || this.$route`, so the shim has to
      // expose the internal component instance under `_` like Vue's own ctx does.
      if (key === '_') return instance
      if (key === '$route') return getRoute()
      if (key === '$router') return router
      if (key === '$store') return nuxtApp.$store
      if (key === '$axios') return nuxtApp.$api
      if (key === '$api') return nuxtApp.$api
      if (key === '$refs') return instance?.refs || {}
      if (key === '$slots') return getLegacySlots()
      if (key === '$emit') return instance?.emit?.bind(instance)
      if (key === '$nextTick') return nuxtApp.vueApp.config.globalProperties.$nextTick
      if (key === '$set') return (object: any, property: string, value: any) => { object[property] = value }
      if (key in state) return state[key]
      if (key in computedValues) return computedValues[key].value
      if (key in methods) return methods[key]
      if (key in props) return props[key]
      if (key in store) return (store as any)[key]
      return (nuxtApp as any)[key] ?? (nuxtApp.vueApp.config.globalProperties as any)[key]
    },
    set (_target, key: string, value: any) {
      if (key in computedValues && computedValues[key].effect) {
        computedValues[key].value = value
        return true
      }
      state[key] = value
      return true
    },
    has (_target, key: string) {
      return key in state || key in computedValues || key in methods || key in props
    }
  })

  const apiContext = {
    app: { router },
    route: getRoute(),
    params: getRoute().params,
    query: getRoute().query,
    store: nuxtApp.$store,
    $axios: nuxtApp.$api,
    $api: nuxtApp.$api,
    $config: useRuntimeConfig().public,
    $router: router,
    redirect: (path: any, query?: any) => navigateTo(typeof path === 'string' ? path : { path, query }),
    error: (error: any) => showError(error)
  }

  if (typeof options.data === 'function') {
    Object.assign(state, options.data.call(vm) || {})
  }

  Object.entries(options.methods || {}).forEach(([name, method]: [string, any]) => {
    methods[name] = (...args: any[]) => method.apply(vm, args)
  })

  Object.entries(options.computed || {}).forEach(([name, value]: [string, any]) => {
    if (typeof value === 'function') {
      computedValues[name] = computed(() => value.call(vm))
    } else {
      computedValues[name] = computed({
        get: () => value.get?.call(vm),
        set: (nextValue) => value.set?.call(vm, nextValue)
      })
    }
  })

  Object.entries(options.watch || {}).forEach(([path, watcher]: [string, any]) => {
    const handler = typeof watcher === 'function' ? watcher : watcher.handler
    const callback = (...args: any[]) => handler?.apply(vm, args)
    watch(() => readPath(vm, path), callback, typeof watcher === 'object' ? watcher : {})
  })

  if (options.head) {
    useHead(computed(() => normalizeHead(options.head.call(vm))))
  }

  const callHook = (name: string) => options[name]?.call(vm)
  if (options.beforeMount) onBeforeMount(() => callHook('beforeMount'))
  if (options.mounted) onMounted(() => callHook('mounted'))
  if (options.beforeDestroy || options.beforeUnmount) onBeforeUnmount(() => callHook('beforeDestroy') || callHook('beforeUnmount'))
  if (options.destroyed || options.unmounted) onUnmounted(() => callHook('destroyed') || callHook('unmounted'))

  const finishSetup = () => {
    if (options.created) callHook('created')
    const bindings: Record<string, any> = Object.fromEntries(Object.keys(state).map(key => [key, toRef(state, key)]))
    Object.entries(computedValues).forEach(([key, value]) => { bindings[key] = value })
    Object.entries(methods).forEach(([key, value]) => { bindings[key] = value })
    return bindings
  }

  if (options.asyncData) {
    const queryWatch = (options.watchQuery || []).map((key: string) => computed(() => getRoute().query[key]))
    return useAsyncData(
      `legacy-page:${getRoute().fullPath}`,
      async () => {
        const value = (await options.asyncData(apiContext)) ?? null
        if (value && typeof value === 'object') Object.assign(state, value)
        return value
      },
      { watch: queryWatch, default: () => null }
    ).then((asyncResult) => {
      if (asyncResult.error.value) throw asyncResult.error.value
      if (asyncResult.data.value && typeof asyncResult.data.value === 'object') {
        Object.assign(state, asyncResult.data.value)
      }
      return finishSetup()
    })
  }

  return finishSetup()
}
