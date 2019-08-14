export default {
  async GET_CONFIGURATION_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/configurations')
    commit('configurationList', data)
  },
  async GET_FILE_ASSET_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/fileAssets')
    commit('fileAssetList', data)
  },
  async GET_IMAGE_ASSET_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/imageAssets')
    commit('imageAssetList', data)
  },
  async GET_MODULE_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/modules')
    commit('moduleList', data)
  },
  async GET_PAGE_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/pages')
    commit('pageList', data)
  },
  async GET_CATEGORY_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/categories')
    commit('categoryList', data)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('GET_CONFIGURATION_COLLECTION')
    await dispatch('GET_FILE_ASSET_COLLECTION')
    await dispatch('GET_IMAGE_ASSET_COLLECTION')
    await dispatch('GET_MODULE_COLLECTION')
    await dispatch('GET_PAGE_COLLECTION')
    await dispatch('GET_CATEGORY_COLLECTION')
  }
}
