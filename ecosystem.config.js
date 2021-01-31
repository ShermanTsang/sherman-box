module.exports = {
  apps: [
    {
      name: 'ShareManBox-Nuxt-V3',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      exec_mode: 'cluster',
      instances: 'max',
      watch: '.'
    }
  ],

  deploy: {
  }
}
