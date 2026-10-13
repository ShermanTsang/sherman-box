// Keep this filename: bare `pm2 start` only auto-detects `ecosystem.config.js`.
const runtimeEnvNames = {
  NUXT_PUBLIC_SITE_NAME: 'SITE_NAME',
  NUXT_PUBLIC_SITE_DESCRIPTION: 'SITE_DESCRIPTION',
  NUXT_PUBLIC_SITE_KEYWORDS: 'SITE_KEYWORDS',
  NUXT_PUBLIC_SITE_DOMAIN: 'SITE_DOMAIN',
  NUXT_PUBLIC_API_BASEURL: 'API_BASEURL',
  NUXT_PUBLIC_OSS_BASEURL: 'OSS_BASEURL'
}
const runtimeEnv = Object.fromEntries(Object.entries(runtimeEnvNames)
  .map(([nuxtName, legacyName]) => [nuxtName, process.env[nuxtName] || process.env[legacyName]])
  .filter(([, value]) => Boolean(value)))

module.exports = {
  apps: [{
    name: 'ShermanBox-Nuxt-V4',
    cwd: __dirname,
    script: './.output/server/index.mjs',
    interpreter: 'node',
    exec_mode: 'cluster',
    instances: 'max',
    watch: false,
    env: {
      NODE_ENV: 'production',
      NITRO_HOST: process.env.NITRO_HOST || '0.0.0.0',
      PORT: process.env.PORT || 3000,
      ...runtimeEnv
    }
  }],
  deploy: {}
}
