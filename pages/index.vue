<style lang="scss">
</style>

<template>
  <div>
    <div v-for="item in data.timeline" :key="`${item.module}-${item.id}`">
      <item-day v-if="item.module === 'day'" :item="item"></item-day>
      <item-movie v-if="item.module === 'movie'" :item="item"></item-movie>
      <item-blog v-if="item.module === 'blog'" :item="item"></item-blog>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
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
