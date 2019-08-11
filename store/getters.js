export default {
  configurationCollection(state) {
    return state.configurationCollection
  },
  fileAssetCollection(state) {
    return state.fileAssetCollection
  },
  imageAssetCollection(state) {
    return state.imageAssetCollection
  },
  moduleCollection(state) {
    const extraModule = [
      { name: '轴线', url: 'timeline', icon: 'iconfont icon-schedule' }
    ]
    return extraModule.concat(state.moduleCollection)
  },
  pageCollection(state) {
    return state.pageCollection
  },
  categoryCollection(state) {
    return state.categoryCollection
  }
}
