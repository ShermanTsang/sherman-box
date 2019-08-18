<style lang="scss">
</style>

<template>
  <layout-container>
    404
  </layout-container>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'redirect',
  asyncData({ params }) {
    return {}
  },
  methods: {
  }
}
</script>
