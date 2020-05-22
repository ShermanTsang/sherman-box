export default function ({ app: { router }, route, store, redirect }) {
  const pathArray = route.path.split('/')
  const pageType = ['index', 'list', 'item'][pathArray.length + -1]
  const pageModule = pathArray[1]
  const currentPage = {
    type: pageType,
    module: pageModule
  }
  store.commit('SET_CURRENT_PAGE', currentPage)
  store.commit('SET_CURRENT_ITEM', {})
}
