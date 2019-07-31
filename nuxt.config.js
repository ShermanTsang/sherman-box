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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: config['site.description'] },
      { hid: 'keywords', name: 'keywords', content: config['site.keywords'] }
    ],
    script: [
      process.BROWSER_BUILD && process.env.NODE_ENV === 'production' ? { src: `https://hm.baidu.com/hm.js?${config['3rd.baiduAnalyze.id']}` } : {}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'favicon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0a84ea' },

  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '@/assets/scss/global.scss',
    '@/assets/scss/variables.scss',
    '@/assets/scss/override.scss',
    '@/assets/iconfont/iconfont.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/helper', ssr: true },
    { src: '@/plugins/antdUI', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/autoComponents', ssr: true },
    { src: '@/plugins/moment', ssr: false },
    { src: '@/plugins/gradientColor', ssr: false },
    { src: '@/plugins/vue-lazyload', ssr: false },
    { src: '@/plugins/3rdAnalyze', ssr: false }
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

  proxy: {
    '/api/': { target: `${config['api.protocol']}://${config['api.domain']}`, pathRewrite: { '^/api/': 'v1/' } },
    '/oss/': { target: `${config['oss.protocol']}://${config['oss.domain.https']}`, pathRewrite: { '^/oss/': '/' } }
  },

  /*
  ** Build configuration
  */
  build: {
    maxChunkSize: 300000,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
