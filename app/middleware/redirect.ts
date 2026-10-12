export default defineNuxtRouteMiddleware((to) => {
  const path = Array.isArray(to.params.path) ? to.params.path.join('/') : String(to.params.path || '')
  if (/^\d{4}-\d{2}-\d{2}$/.test(path)) {
    return navigateTo(`/day/${path}`, { redirectCode: 301 })
  }
  if (path === 'timeline') {
    return navigateTo('/', { redirectCode: 301 })
  }
})
