<style lang="scss">
  .page {
  }
</style>

<template>
  <LayoutContainer class="page">
    <Blocker height="40px" />
    <Nameplate :title="data.pageItem.name" :sub-title="data.pageItem.url" />
    <Markdown :content="data.pageItem.content" />
    <Blocker height="40px" />
    <Comment :id="data.pageItem.id" :source-data="data.pageItem.comments" module="page" />
  </LayoutContainer>
</template>

<script>
export default {
  validate ({ params }) {
    const customPageNameArray = ['log']
    return params.url && !customPageNameArray.includes(params.url)
  },
  async asyncData ({ $axios, params }) {
    const { data: pageItem } = await $axios.$get(`/api/pages/${params.url}`)
    return {
      data: {
        pageItem
      }
    }
  },
  mounted () {
  },
  head () {
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
  }
}
</script>
