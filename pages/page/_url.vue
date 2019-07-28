<style lang="scss">
  .page {
  }
</style>

<template>
  <container class="page" :max-width="1060">
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
  head() {
    return {
      title: this.$getSeoInfo('title', `${this.data.pageItem.name} - 页面`),
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', this.data.pageItem.description || '') }
      ]
    }
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
