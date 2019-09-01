<style lang="scss">
</style>

<template>
  <layout-container>
    <Blocker height="40px" />
    <Nameplate title="时间轴" sub-title="timeline" />
    <Timeline :timeline="data.timeline" :meta="meta" @on-request-more="requestTimeline()" />
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
  data() {
    return {
      status: {
        currentPage: 1
      }
    }
  },
  async asyncData({ $axios, query }) {
    const { data: timeline, meta } = await $axios.$get('/api/common/timeline', {
      params: {
        pageSize: 10,
        page: query.page
      }
    })
    return {
      data: {
        timeline
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    async requestTimeline() {
      const requestPage = this.status.currentPage + 1
      const { data: timeline, meta } = await this.$axios.$get('/api/common/timeline', {
        params: {
          pageSize: 10,
          page: requestPage
        }
      })
      this.data.timeline = this.data.timeline.concat(timeline)
      this.meta = meta
      this.status.currentPage++
    }
  }
}
</script>
