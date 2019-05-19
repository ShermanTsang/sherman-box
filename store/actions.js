export default {
  async moduleCollection({ commit }) {
    const { data } = await this.$axios.$get('/api/modules')
    commit('moduleCollection', data.moduleCollection)
  }
}
