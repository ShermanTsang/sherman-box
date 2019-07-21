export default {
  async GET_CONFIGURATION_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/configurations')
    commit('configurationCollection', data)
  },
  async GET_FILE_ASSET_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/fileAssets')
    commit('fileAssetCollection', data)
  },
  async GET_IMAGE_ASSET_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/imageAssets')
    commit('imageAssetCollection', data)
  },
  async GET_MODULE_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/modules')
    commit('moduleCollection', data)
  },
  async GET_PAGE_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/pages')
    commit('pageCollection', data)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('GET_CONFIGURATION_COLLECTION')
    await dispatch('GET_FILE_ASSET_COLLECTION')
    await dispatch('GET_IMAGE_ASSET_COLLECTION')
    await dispatch('GET_MODULE_COLLECTION')
    await dispatch('GET_PAGE_COLLECTION')
  }
}
