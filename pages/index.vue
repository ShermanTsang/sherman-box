<style lang="scss">
</style>

<template>
  <layout-container>
    <Blocker height="40px" />
    <Nameplate title="时间轴" sub-title="timeline" />
    <Timeline :timeline="data.timeline" />
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
    const { data: timeline, meta } = await $axios.$get('/api/common/timeline', {
      params: {
        pageSize: 14,
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
