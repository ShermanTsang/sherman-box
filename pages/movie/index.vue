<style lang="scss">
</style>

<template>
  <div>
    IndexPage
    {{ data.blogCollection }}
    <br>
    <nuxt-link to="/blog/1">
      Blog1
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get('/api/blogs')
    return {
      data: {
        blogCollection: data
      }
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>
