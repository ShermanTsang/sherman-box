export default {
  async GET_CONFIGURATION_LIST({ commit }) {
    const { data } = await this.$axios.$get('/api/configurations')
    commit('configurationList', data)
  },
  async GET_FILE_ASSET_LIST({ commit }) {
    const { data } = await this.$axios.$get('/api/fileAssets')
    commit('fileAssetList', data)
  },
  async GET_IMAGE_ASSET_LIST({ commit }) {
    const { data } = await this.$axios.$get('/api/imageAssets')
    commit('imageAssetList', data)
  },
  async GET_MODULE_LIST({ commit }) {
    const { data } = await this.$axios.$get('/api/modules')
    commit('moduleList', data)
  },
  async GET_PAGE_LIST({ commit }) {
    const { data } = await this.$axios.$get('/api/pages')
    commit('pageList', data)
  },
  async GET_CATEGORY_LIST({ commit }) {
    const { data } = await this.$axios.$get('/api/categories')
    commit('categoryList', data)
  },
  async GET_INIT_DATA({ commit }) {
    const [configurations, fileAssets, imageAssets, modules, pages, categories] = await Promise.all([
      this.$axios.$get('/api/configurations'),
      this.$axios.$get('/api/fileAssets'),
      this.$axios.$get('/api/imageAssets'),
      this.$axios.$get('/api/modules'),
      this.$axios.$get('/api/pages'),
      this.$axios.$get('/api/categories')
    ])
    commit('configurationList', configurations.data)
    commit('fileAssetList', fileAssets.data)
    commit('imageAssetList', imageAssets.data)
    commit('moduleList', modules.data)
    commit('pageList', pages.data)
    commit('categoryList', categories.data)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('GET_INIT_DATA')
    // await dispatch('GET_CONFIGURATION_LIST')
    // await dispatch('GET_FILE_ASSET_LIST')
    // await dispatch('GET_IMAGE_ASSET_LIST')
    // await dispatch('GET_MODULE_LIST')
    // await dispatch('GET_PAGE_LIST')
    // await dispatch('GET_CATEGORY_LIST')
  }
}
