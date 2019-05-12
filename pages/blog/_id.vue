<style lang="scss">
</style>

<template>
  <div>
    {{ test2 }}
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ context, $axios }) {
    const test = await $axios.$get('https://jsonplaceholder.typicode.com/posts')
    return {
      test,
      test2: 'test2'
    }
  }
}
</script>
