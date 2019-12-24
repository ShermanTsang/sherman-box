<style lang="scss">
</style>

<template>
  <LayoutContainer>
    <Tip>页面不存在！</Tip>
  </LayoutContainer>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'redirect',
  head() {
    return {
      title: '页面不存在',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '页面不存在') }
      ]
    }
  },
  asyncData({ params }) {
    return {}
  },
  methods: {
  }
}
</script>
