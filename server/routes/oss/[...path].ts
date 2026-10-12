import { proxyUpstream } from '../../utils/proxy-upstream'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  return proxyUpstream(event, String(config.public.ossBaseurl || process.env.OSS_BASEURL || ''))
})
