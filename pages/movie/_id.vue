<style lang="scss">
</style>

<template>
  <div>
    {{ data.movieItem }}
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ $axios, params }) {
    const data = await $axios.$get(`api/movies/${params.id}`)
    return {
      data: {
        movieItem: data.movieItem
      }
    }
  }
}
</script>
