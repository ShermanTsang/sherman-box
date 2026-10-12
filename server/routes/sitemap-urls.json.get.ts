export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const baseURL = String(config.public.apiBaseurl || '').replace(/\/$/, '')
  if (!baseURL) return []

  try {
    const response: any = await $fetch(`${baseURL}/common/sitemap`)
    const pages = response?.data?.data || []
    return pages.map((item: any) => ({
      loc: `/${item.module}/${item.resource_sn}`,
      changefreq: 'daily',
      priority: 1
    }))
  } catch (error) {
    console.warn('[sitemap] Could not load API URLs; returning an empty dynamic URL list.', error)
    return []
  }
})
