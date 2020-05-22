function storeToLocalStorage (key, data) {
  if (process.client) {
    try {
      localStorage.setItem(`ShareManBox~${key}`, JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  SET_CURRENT_PAGE (state, data) {
    state.currentPage = data
  },
  SET_CURRENT_ITEM (state, data) {
    state.currentItem = data
  },
  SET_CONFIGURATION_LIST (state, data) {
    state.configurationList = data
  },
  SET_IMAGE_ASSET_LIST (state, data) {
    state.imageAssetList = data
  },
  SET_FILE_ASSET_LIST (state, data) {
    state.fileAssetList = data
  },
  SET_MODULE_LIST (state, data) {
    state.moduleList = data
  },
  SET_PAGE_LIST (state, data) {
    state.pageList = data
  },
  SET_CATEGORY_LIST (state, data) {
    state.categoryList = data
  },
  SET_STATISTICS_MODULE (state, data) {
    state.statisticsModule = data
  },
  SET_USER (state, data) {
    state.user = data
    storeToLocalStorage('user', data)
  }
}
