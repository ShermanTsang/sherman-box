<style lang="scss">
</style>

<template>
  <div>
    {{ data.pageItem }}
  </div>
</template>

<script>
export default {
  validate({ params }) {
    // return /^\d+$/.test(params.id)
  },
  async asyncData({ $axios, params }) {
    const data = await $axios.$get(`api/pages/${params.id}`)
    return {
      data: {
        pageItem: data.pageItem
      }
    }
  }
}
</script>
