<style lang="scss">
</style>

<template>
  <LayoutContainer>
    <Tip asset="pic-404">
      页面不存在
    </Tip>
  </LayoutContainer>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'redirect',
  asyncData ({ params }) {
    return {}
  },
  methods: {
  },
  head () {
    return {
      title: '页面不存在',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '页面不存在') }
      ]
    }
  }
}
</script>
