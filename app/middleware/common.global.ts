export default defineNuxtRouteMiddleware((to) => {
  const store = useAppStore()
  const pathArray = to.path.split('/')
  store.setCurrentPage({
    type: ['index', 'list', 'item'][pathArray.length - 1],
    module: pathArray[1]
  })
  store.setCurrentItem({})
})
