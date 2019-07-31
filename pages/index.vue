<style lang="scss">
</style>

<template>
  <container :max-width="1060">
    <blocker height="40px" />
    <nameplate title="告示" sub-title="announce" />
    <markdown
      content="您现在看到的是曾小满的盒子第三版，网站近期已基于新的技术栈进行重构，部分调整还在进行中。
    目前访问可能会出现较多的问题，新版本更新完全后会有较大的改善。(WEBHOOK DEPLOY TEST 2019-07-31)"
    ></markdown>
    <blocker height="40px" />
    <nameplate title="时间轴" sub-title="timeline" />
    <item-common v-for="item in data.timeline" :key="`${item.module}-${item.id}`" :item="item">
    </item-common>
  </container>
</template>

<script>
export default {
  layout: 'default',
  head() {
    return {
      title: this.$getSeoInfo('title', '时间轴'),
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '我的时间轴') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: timeline, meta } = await $axios.$get(`/api/common/timeline`, {
      params: {
        pageSize: 12,
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
