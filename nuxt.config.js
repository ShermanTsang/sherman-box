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
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: config['site.description'] },
      { hid: 'keywords', name: 'keywords', content: config['site.keywords'] }
    ],
    script: [
      process.env.NODE_ENV === 'production' ? { src: `https://hm.baidu.com/hm.js?${config['3rd.baiduAnalyze.id']}` } : {}
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
    { src: '@/plugins/vee-validate', mode: 'client' },
    { src: '@/plugins/message', mode: 'client' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

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
    extractCSS: true,
    maxChunkSize: 300000,
    postcss: {
      plugins: {
        'postcss-url': false
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Add scss variables
      config.module.rules.forEach((rule) => {
        if (/scss/.test(rule.test.toString())) {
          rule.oneOf.forEach((item) => {
            item.use.push({
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                data: '@import "@/assets/scss/variables.scss";'
              }
            })
          })
        }
      })
    }
  }
}
