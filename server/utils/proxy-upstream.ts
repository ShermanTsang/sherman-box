import { createError, getRequestURL, getRouterParam, proxyRequest } from 'h3'

export function proxyUpstream (event: any, baseURL: string) {
  if (!baseURL) {
    throw createError({ statusCode: 503, statusMessage: 'Upstream service is not configured' })
  }

  const path = String(getRouterParam(event, 'path') || '').replace(/^\/+/, '')
  const upstreamURL = `${baseURL.replace(/\/$/, '')}/${path}${getRequestURL(event).search}`
  return proxyRequest(event, upstreamURL)
}
