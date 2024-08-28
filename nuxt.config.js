import axios from 'axios'

export default {
  publicRuntimeConfig: {
    serverHost: process.env.SERVER_HOST || '0.0.0.0',
    serverPort: process.env.SERVER_PORT || 3000,
    siteName: process.env.SITE_NAME,
    siteDescription: process.env.SITE_DESCRIPTION,
    siteKeywords: process.env.SITE_KEYWORDS,
    siteDomain: process.env.SITE_DOMAIN,
    apiBaseurl: process.env.API_BASEURL,
    ossBaseurl: process.env.OSS_BASEURL
  },
  privateRuntimeConfig: {
    // apiSecret: process.env.API_SECRET
  },
  server: {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `%s - ${process.env.SITE_NAME}`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: process.env.SITE_DESCRIPTION },
      { hid: 'keywords', name: 'keywords', content: process.env.SITE_KEYWORDS }
    ],
    script: [
      // { src: `//hm.baidu.com/hm.js?${process.env.SERVICE_BAIDU_ANALYZE_ID}` },
      {
        innerHTML: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "ntwi7inprr");`,
        type: 'text/javascript'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'favicon', href: '/favicon.ico' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  /*
  ** Customize the progress-bar
  */
  loading: '@/components/PageLoading.vue',

  /*
  ** Global CSS
  */
  css: [
    // 'normalize.css',
    '@/assets/css/global.scss',
    '@/assets/css/animate.scss',
    '@/assets/css/override.scss',
    '@/assets/css/font.scss',
    '@/assets/iconfont/iconfont.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/utils' },
    { src: '@/plugins/day-js' },
    { src: '@/plugins/auto-components' },
    { src: '@/plugins/axios' },
    { src: '@/plugins/transfer-dom', mode: 'client' },
    { src: '@/plugins/gradient-color', mode: 'client' },
    { src: '@/plugins/vue-lazyload', mode: 'client' },
    { src: '@/plugins/vue-router', mode: 'client' },
    { src: '@/plugins/message', mode: 'client' },
    { src: '@/plugins/html2canvas', mode: 'client' },
    { src: '@/plugins/qrcodejs2', mode: 'client' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap'
    // '@nuxtjs/pwa'
  ],

  /*
  ** Nuxt.js modules sitemap configuration
  */
  sitemap: {
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    routes: async () => {
      const { data: { data: pages } } = await axios.get(`${process.env.API_BASEURL}/common/sitemap`)
      const routers = []
      pages.forEach((item) => {
        routers.push({
          url: `/${item.module}/${item.resource_sn}`,
          changefreq: 'daily',
          priority: 1
        })
      })
      return routers
    }
  },

  /*
  ** Nuxt.js modules axios configuration
  */
  axios: {
    proxy: true
  },

  /*
  ** Proxy configuration
  */
  proxy: {
    '/api/': { target: `${process.env.API_BASEURL}`, pathRewrite: { '^/api/': '/' } },
    '/oss/': { target: `${process.env.OSS_BASEURL}`, pathRewrite: { '^/oss/': '/' } }
  },

  /*
  ** Router configuration
  */
  router: {
    middleware: 'common'
  },

  /*
  ** Build configuration
  */
  build: {
    analyze: false,
    extractCSS: process.env.NODE_ENV === 'production',
    maxChunkSize: 100000,
    postcss: {
      plugins: {
        'postcss-url': false
      }
    },
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass'),
        additionalData: '@use "sass:math";@import "@/assets/css/variables.scss";'
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, loaders }) {
      // Run ESLint on save
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** Progressive web app configuration
  */
  // pwa: {
  //   icon: {
  //     iconSrc: './static/icon.png'
  //   },
  //   manifest: {
  //     name: process.env.SITE_NAME,
  //     lang: 'zh',
  //     start_url: '/'
  //   },
  //   workbox: {
  //     workboxURL: 'https://g.alicdn.com/kg/workbox/4.3.1/workbox-sw.js',
  //     config: {
  //       modulePathPrefix: 'https://g.alicdn.com/kg/workbox/'
  //     }
  //   }
  // }

  buildModules: [
    '@nuxtjs/tailwindcss'
  ]

}
