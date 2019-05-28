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
    '@/assets/variables.scss',
    '@/assets/override.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/config', ssr: true },
    { src: '@/plugins/helper', ssr: true },
    { src: '@/plugins/antd-ui', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/components', ssr: true },
    { src: '@/plugins/grade-color', ssr: false },
    { src: '@/plugins/vue-lazyload', ssr: false }
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
    // https: true,
    // host: 'api.share-man.com',
    // prefix: 'v1'
    // proxyHeaders: false
    proxy: true
  },

  proxy: {
    '/api/': { target: 'https://api.share-man.com', pathRewrite: { '^/api/': 'v1/' } },
    '/oss/': { target: 'https://cdn.share-man.com', pathRewrite: { '^/oss/': '/' } }
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
