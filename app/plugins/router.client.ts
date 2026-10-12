export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  router.onError((error) => {
    if (/^Loading chunk (\d)+ failed\./.test(error.message)) {
      nuxtApp.$message.info('页面已更新，刷新本地缓存中...')
      location.reload()
    }
  })
  router.afterEach((to) => {
    if (import.meta.env.PROD) {
      try {
        window._hmt = window._hmt || []
        window._hmt.push(['_trackPageview', to.fullPath])
      } catch {}
    }
  })
})
