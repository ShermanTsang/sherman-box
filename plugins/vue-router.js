import Vue from 'vue'

export default ({ app: { router }, store }) => {
  // Avoid chuck local cache error
  router.onError((err) => {
    const pattern = /^Loading chunk (\d)+ failed\./
    const isChunkLoadingFailed = pattern.test(err.message)
    if (isChunkLoadingFailed) {
      Vue.prototype.$message.info('页面已更新，刷新本地缓存中...')
      location.reload()
      // window.location.replace(window.location.href)
    }
  })

  // Inject 3rd statistics service
  router.afterEach((to, from) => {
    if (process.env.NODE_ENV === 'production') {
      try {
        window._hmt = window._hmt || []
        window._hmt.push(['_trackPageview', to.fullPath])
      } catch (e) {
      }
    }
  })
}
