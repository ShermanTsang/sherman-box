import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'
import zhCn from 'dayjs/locale/zh-cn'
import { useAppStore } from '~/stores/app'
import { useSiteHelpers } from '~/composables/useSiteHelpers'

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(relativeTime)
  dayjs.extend(calendar)
  // Register the locale on this instance explicitly: the side-effect import of
  // `dayjs/locale/zh-cn` can register it on another copy of dayjs in the server bundle.
  dayjs.locale(zhCn)

  const store = useAppStore()
  const helpers = useSiteHelpers()
  const message = {
    info: (text: string, callback?: () => void) => showMessage('info', text, callback),
    success: (text: string, callback?: () => void) => showMessage('success', text, callback),
    error: (text: string, callback?: () => void) => showMessage('error', text, callback),
    warning: (text: string, callback?: () => void) => showMessage('warning', text, callback)
  }

  function showMessage (type: string, text: string, callback?: () => void) {
    if (!import.meta.client || !text) return
    const element = document.createElement('div')
    element.className = `message message--${type}`
    element.textContent = text
    Object.assign(element.style, {
      position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
      padding: '10px 16px', zIndex: '9999', color: '#fff', borderRadius: '20px',
      backgroundColor: type === 'info' ? '#3b82f6' : type === 'success' ? 'green' : type === 'warning' ? 'orange' : 'red'
    })
    document.body.appendChild(element)
    window.setTimeout(() => {
      element.remove()
      callback?.()
    }, 4000)
  }

  const legacyStore = {
    getters: {
      get currentPage () { return store.currentPage },
      get currentItem () { return store.currentItem },
      get configurationList () { return store.configurationList },
      get fileAssetList () { return store.fileAssetList },
      get imageAssetList () { return store.imageAssetList },
      get moduleList () { return store.modulesWithExtras },
      get pageList () { return store.pagesWithExtras },
      get categoryList () { return store.categoryList },
      get statisticsModule () { return store.statisticsWithText },
      get user () { return store.user },
      get hasNavigator () { return store.hasNavigator }
    },
    commit (type: string, value: any) {
      const mutations: Record<string, (data: any) => void> = {
        SET_CURRENT_PAGE: store.setCurrentPage,
        SET_CURRENT_ITEM: store.setCurrentItem,
        SET_CONFIGURATION_LIST: store.setConfigurationList,
        SET_FILE_ASSET_LIST: store.setFileAssetList,
        SET_IMAGE_ASSET_LIST: store.setImageAssetList,
        SET_MODULE_LIST: store.setModuleList,
        SET_PAGE_LIST: store.setPageList,
        SET_CATEGORY_LIST: store.setCategoryList,
        SET_STATISTICS_MODULE: store.setStatisticsModule,
        SET_USER: store.setUser,
        SET_HAS_NAVIGATOR: store.setHasNavigator
      }
      mutations[type]?.(value)
    }
  }

  const injections: Record<string, any> = {
    time: dayjs,
    message,
    store: legacyStore,
    ...Object.fromEntries(Object.entries(helpers).map(([name, fn]) => [name, fn]))
  }
  Object.entries(injections).forEach(([name, value]) => {
    if (value !== undefined) nuxtApp.provide(name, value)
  })
})
