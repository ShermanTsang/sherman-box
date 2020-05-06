<style lang="scss">
</style>

<template>
  <LayoutContainer>
    <Blocker height="40px" />
    遇到错误了
  </LayoutContainer>
</template>

<script>
export default {
  layout: 'error',
  data () {
    return {
      status: {
        currentPage: 1
      }
    }
  },
  mounted () {
  },
  methods: {
  },
  head () {
    return {
      title: '遇到错误了',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '访问遇到错误了') }
      ]
    }
  }
}
</script>
