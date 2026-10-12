export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const publicConfig = config.public

  const normalizeURL = (url: string) => {
    if (!import.meta.server || !url.startsWith('/api/')) return url
    const baseURL = String(publicConfig.apiBaseurl || process.env.NUXT_PUBLIC_API_BASEURL || process.env.API_BASEURL || '').replace(/\/$/, '')
    return baseURL ? `${baseURL}/${url.replace(/^\/api\//, '')}` : url
  }

  const request = $fetch.create({
    onResponse ({ response }) {
      if (!import.meta.client) return
      const payload: any = response._data
      if (!payload || typeof payload !== 'object') return
      const { event, message } = payload
      if (event === 'returnErrorMessage' || event === 6000) {
        nuxtApp.$message.error(message)
        throw new Error(message || 'Request failed')
      }
      if (event === 'returnInfoMessage') nuxtApp.$message.info(message)
      if (event === 'returnSuccessMessage') nuxtApp.$message.success(message)
      if (event === 'returnWarningMessage') nuxtApp.$message.warning(message)
    },
    onResponseError ({ response }) {
      if (import.meta.client && response.status === 500) {
        const statusCustomText = (response as any)._data?.statusCustomText || ''
        void nuxtApp.runWithContext(() => navigateTo({ path: '/error', query: { stateCode: 500, stateCustomText } }))
      }
    }
  })

  const call = (url: string, options: Record<string, any> = {}) => {
    const { params, ...rest } = options
    return request(normalizeURL(url), { ...rest, query: rest.query || params })
  }
  const api = {
    request: call,
    get: (url: string, options?: Record<string, any>) => call(url, { ...options, method: 'GET' }),
    post: (url: string, body?: any, options?: Record<string, any>) => call(url, { ...options, method: 'POST', body }),
    put: (url: string, body?: any, options?: Record<string, any>) => call(url, { ...options, method: 'PUT', body }),
    delete: (url: string, options?: Record<string, any>) => call(url, { ...options, method: 'DELETE' }),
    $get: (url: string, options?: Record<string, any>) => call(url, { ...options, method: 'GET' }),
    $post: (url: string, body?: any, options?: Record<string, any>) => call(url, { ...options, method: 'POST', body }),
    $put: (url: string, body?: any, options?: Record<string, any>) => call(url, { ...options, method: 'PUT', body })
  }

  return { provide: { api } }
})
