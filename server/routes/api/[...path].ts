import { proxyUpstream } from '../../utils/proxy-upstream'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  return proxyUpstream(event, String(config.public.apiBaseurl || process.env.API_BASEURL || ''))
})
