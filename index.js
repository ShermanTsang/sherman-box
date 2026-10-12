const http = require('node:http')
const https = require('node:https')
const serverless = require('serverless-http')

let handlerPromise

async function createHandler () {
  const runtimeEnv = {
    NUXT_PUBLIC_SITE_NAME: 'SITE_NAME',
    NUXT_PUBLIC_SITE_DESCRIPTION: 'SITE_DESCRIPTION',
    NUXT_PUBLIC_SITE_KEYWORDS: 'SITE_KEYWORDS',
    NUXT_PUBLIC_SITE_DOMAIN: 'SITE_DOMAIN',
    NUXT_PUBLIC_API_BASEURL: 'API_BASEURL',
    NUXT_PUBLIC_OSS_BASEURL: 'OSS_BASEURL'
  }
  for (const [nuxtName, legacyName] of Object.entries(runtimeEnv)) {
    if (!process.env[nuxtName] && process.env[legacyName]) process.env[nuxtName] = process.env[legacyName]
  }

  const originalHttpListen = http.Server.prototype.listen
  const originalHttpsListen = https.Server.prototype.listen
  const suppressListen = function () { return this }

  try {
    // The node-server preset starts listening as soon as its entrypoint loads.
    // Nitro's registry plugin exposes the built app before that side effect.
    http.Server.prototype.listen = suppressListen
    https.Server.prototype.listen = suppressListen
    await import('./.output/server/index.mjs')
  } finally {
    http.Server.prototype.listen = originalHttpListen
    https.Server.prototype.listen = originalHttpsListen
  }

  const nitroApp = globalThis[Symbol.for('sherman-box.nuxt.nitro-app')]
  if (!nitroApp?.h3App) {
    throw new Error('Nuxt Nitro output did not expose its H3 app')
  }
  const { toNodeListener } = await import('h3')
  return serverless(toNodeListener(nitroApp.h3App))
}

exports.main = async (...args) => {
  handlerPromise ||= createHandler()
  const handler = await handlerPromise
  return handler(...args)
}
