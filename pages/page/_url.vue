<style lang="scss">
  .page {
  }
</style>

<template>
  <layout-container class="page">
    <Blocker height="40px" />
    <Nameplate :title="data.pageItem.name" :sub-title="data.pageItem.url" />
    <Blocker height="40px" />
    <Markdown :content="data.pageItem.content" />
  </layout-container>
</template>

<script>
export default {
  validate({ params }) {
    return params.url
  },
  head() {
    return {
      title: `${this.data.pageItem.name} - 页面`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', this.data.pageItem.description || '')
        }
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
