import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#08AEEA' },

  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    'ant-design-vue/dist/antd.css',
    '@/assets/global.scss',
    '@/assets/override.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/config',
    '@/plugins/helper',
    '@/plugins/antdUI',
    '@/plugins/axios',
    '@/plugins/components'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  /*
  ** Nuxt.js modules axios configuration
  */
  axios: {
    // https: true,
    // host: 'api.share-man.com',
    // prefix: 'v1'
    // proxyHeaders: false
    proxy: true
  },

  proxy: {
    '/api/': { target: 'https://api.share-man.com', pathRewrite: { '^/api/': 'v1/' } }
  },

  /*
  ** Build configuration
  */
  build: {
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
