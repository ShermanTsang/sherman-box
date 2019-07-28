export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    try {
      window._hmt = window._hmt || []
      window._hmt.push(['_trackPageview', to.fullPath])
    } catch (e) {
    }
  })
}
