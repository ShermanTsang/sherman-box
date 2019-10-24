<style lang="scss">
</style>

<template>
  <layout-container>
    <Blocker height="40px" />
    遇到错误了
  </layout-container>
</template>

<script>
export default {
  layout: 'error',
  head() {
    return {
      title: '遇到错误了',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '访问遇到错误了') }
      ]
    }
  },
  data() {
    return {
      status: {
        currentPage: 1
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
