<style lang="scss">
</style>

<template>
  <layout-container>
    <blocker height="40px" />
    <nameplate title="时间轴" sub-title="timeline" />
    <timeline :timeline="data.timeline" />
  </layout-container>
</template>

<script>
export default {
  layout: 'default',
  head() {
    return {
      title: '时间轴',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '我的时间轴') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: timeline, meta } = await $axios.$get(`/api/common/timeline`, {
      params: {
        pageSize: 30,
        page: query.page
      }
    })
    return {
      data: {
        timeline
      },
      meta
    }
  }
}
</script>
