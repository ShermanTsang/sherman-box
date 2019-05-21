<style lang="scss">
  .blog {
    max-width: 960px;
  }
</style>

<template>
  <layout-container class="blog">
    <div class="blog__title">
      {{ data.blogItem.title }}
    </div>
    <markdown class="blog__content" :content="data.blogItem.content">
    </markdown>
  </layout-container>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/api/blogs/${params.id}`)
    return {
      data: {
        blogItem: data.blogItem
      }
    }
  }
}
</script>
