<style lang="scss">
</style>

<template>
  <LayoutContainer>
    <Tip lottie="404">
      您访问的页面丢失
    </Tip>
  </LayoutContainer>
</template>

<script>
export default {
  layout: 'default',
  middleware: ['redirect'],
  asyncData ({ params }) {
    return {}
  },
  mounted () {
  },
  methods: {},
  head () {
    return {
      title: '页面不存在',
      meta: [
        { hid: '404', name: 'description', content: this.$getSeoInfo('description', '页面不存在') }
      ]
    }
  }
}
</script>
