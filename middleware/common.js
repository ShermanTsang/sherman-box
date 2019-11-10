export default function ({ route, store, redirect }) {
  const pathArray = route.path.split('/')
  const pageType = ['index', 'list', 'item'][pathArray.length + -1]
  const pageModule = pathArray[1]
  const currentPage = {
    type: pageType,
    module: pageModule
  }
  store.commit('currentPage', currentPage)
  store.commit('currentItem', {})
}
