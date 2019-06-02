<style lang="scss">
  .page {
  }
</style>

<template>
  <container class="page" :max-width="960">
    <blocker height="40px" />
    <nameplate :title="data.pageItem.name" :sub-title="data.pageItem.url" />
    <blocker height="40px" />
    <markdown :content="data.pageItem.content" />
  </container>
</template>

<script>
export default {
  validate({ params }) {
    return params.url
  },
  async asyncData({ $axios, params }) {
    const { data: pageItem } = await $axios.$get(`/api/pages/${params.url}`)
    return {
      data: {
        pageItem
      }
    }
  },
  mounted() {
  }
}
</script>
