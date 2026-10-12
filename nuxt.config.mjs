import { defineNuxtConfig } from 'nuxt/config'

const apiBaseURL = process.env.NUXT_PUBLIC_API_BASEURL || process.env.API_BASEURL || ''
const ossBaseURL = process.env.NUXT_PUBLIC_OSS_BASEURL || process.env.OSS_BASEURL || ''
const siteName = process.env.NUXT_PUBLIC_SITE_NAME || process.env.SITE_NAME || ''
const siteDescription = process.env.NUXT_PUBLIC_SITE_DESCRIPTION || process.env.SITE_DESCRIPTION || ''
const siteKeywords = process.env.NUXT_PUBLIC_SITE_KEYWORDS || process.env.SITE_KEYWORDS || ''
const siteURL = process.env.NUXT_PUBLIC_SITE_DOMAIN || process.env.SITE_DOMAIN || 'https://shermant.com'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-12',
  telemetry: false,
  devtools: { enabled: false },
  devServer: {
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: Number(process.env.SERVER_PORT || 3000)
  },
  runtimeConfig: {
    public: {
      serverHost: process.env.SERVER_HOST || '0.0.0.0',
      serverPort: Number(process.env.SERVER_PORT || 3000),
      siteName,
      siteDescription,
      siteKeywords,
      siteDomain: siteURL,
      apiBaseurl: apiBaseURL,
      ossBaseurl: ossBaseURL
    }
  },
  app: {
    head: {
      titleTemplate: `%s - ${siteName}`,
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
        },
        { name: 'description', content: siteDescription },
        { name: 'keywords', content: siteKeywords }
      ],
      script: [{
        innerHTML: '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "ntwi7inprr");',
        type: 'text/javascript',
        tagPosition: 'head'
      }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'favicon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.cn' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.cn', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.cn/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600&family=Source+Code+Pro:wght@400;700&display=swap'
        }
      ]
    }
  },
  css: [
    '@/assets/css/global.scss',
    '@/assets/css/animate.scss',
    '@/assets/css/override.scss',
    '@/assets/iconfont/iconfont.css'
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxt/eslint'
  ],
  site: { url: siteURL, name: siteName },
  sitemap: {
    gzip: true,
    sources: ['/sitemap-urls.json'],
    defaults: { changefreq: 'daily', priority: 1 }
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      'tailwindcss/nesting': false
    }
  },
  routeRules: {
    ...(apiBaseURL ? { '/api/**': { proxy: `${apiBaseURL.replace(/\/$/, '')}/**` } } : {}),
    ...(ossBaseURL ? { '/oss/**': { proxy: `${ossBaseURL.replace(/\/$/, '')}/**` } } : {})
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:math";@use "@/assets/css/variables.scss" as *;'
        }
      }
    }
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      concurrency: 1,
      retry: 1,
      failOnError: false
    }
  },
  typescript: {
    typeCheck: false
  }
})
