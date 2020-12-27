<style lang="scss">
</style>

<template>
  <LayoutContainer>
    <Blocker height="40px" />
    <Nameplate title="时间轴" sub-title="timeline" />
    <Timeline :timeline="data.timeline" :meta="meta" @on-request-more="requestTimeline()" />
  </LayoutContainer>
</template>

<script>
export default {
  layout: 'default',
  async asyncData ({ $axios, query }) {
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
  data () {
    return {
      state: {
        currentPage: 1
      }
    }
  },
  mounted () {
  },
  methods: {
    async requestTimeline () {
      const requestPage = this.state.currentPage + 1
      const { data: timeline, meta } = await this.$axios.$get('/api/common/timeline', {
        params: {
          pageSize: 10,
          page: requestPage
        }
      })
      this.data.timeline = [...this.data.timeline, ...timeline]
      this.meta = meta
      this.state.currentPage++
    }
  },
  head () {
    return {
      title: '时间轴',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '我的时间轴') }
      ]
    }
  }
}
</script>
