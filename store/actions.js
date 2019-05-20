export default {
  async GET_MODULE_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/modules')
    commit('moduleCollection', data.moduleCollection)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('GET_MODULE_COLLECTION')
  }
}
