export default ({ app: { router }, store }) => {
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
