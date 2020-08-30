import axios from 'axios'
import config from './config'

export default {
  mode: 'universal',

  server: {
    port: config['server.port'],
    host: config['server.host']
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `%s - ${config['site.name']}`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: config['site.description'] },
      { hid: 'keywords', name: 'keywords', content: config['site.keywords'] }
    ],
    script: [
      { src: `//hm.baidu.com/hm.js?${config['3rd.baiduAnalyze.id']}` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'favicon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar
  */
  loading: '@/components/PageLoading.vue',

  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '@/assets/scss/global.scss',
    '@/assets/scss/animate.scss',
    '@/assets/scss/override.scss',
    '@/assets/scss/font.scss',
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
      const { data: { data: pages } } = await axios.get(`${config['api.protocol']}://${config['api.domain']}/${config['api.version']}/common/sitemap`)
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
    '/api/': { target: `${config['api.protocol']}://${config['api.domain']}`, pathRewrite: { '^/api/': 'v1/' } },
    '/oss/': { target: `${config['oss.protocol']}://${config['oss.domain.https']}`, pathRewrite: { '^/oss/': '/' } }
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
    maxChunkSize: 300000,
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
        additionalData: '@import "@/assets/scss/variables.scss";'
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
  }

  /*
  ** Progressive web app configuration
  */
  // pwa: {
  //   icon: {
  //     iconSrc: './static/icon.png'
  //   },
  //   manifest: {
  //     name: config['site.name'],
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
}
