<style lang="scss">
  .page {
  }
</style>

<template>
  <container class="page" :max-width="960">
    <blocker :height="40" />
    <nameplate :title="data.pageItem.name" :sub-title="data.pageItem.url" />
    <blocker :height="40" />
    <markdown :content="data.pageItem.content" />
  </container>
</template>

<script>
export default {
  validate({ params }) {
    return params.url
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/api/pages/${params.url}`)
    return {
      data: {
        pageItem: data.pageItem
      }
    }
  },
  mounted() {
  }
}
</script>
