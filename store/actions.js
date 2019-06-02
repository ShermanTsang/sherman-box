export default {
  async GET_MODULE_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/modules')
    commit('moduleCollection', data)
  },
  async GET_PAGE_COLLECTION({ commit }) {
    const { data } = await this.$axios.$get('/api/pages')
    commit('pageCollection', data)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('GET_MODULE_COLLECTION')
    await dispatch('GET_PAGE_COLLECTION')
  }
}
