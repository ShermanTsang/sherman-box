<style lang="scss">
</style>

<template>
  <LayoutContainer>
    <Tip asset="pic-error">
      {{ $route.query.statusText || '遇到错误了' }} 错误代码:{{ $route.query.statusCode || '000' }}
    </Tip>
  </LayoutContainer>
</template>

<script>
export default {
  layout: 'error',
  data () {
    return {
      status: {
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
