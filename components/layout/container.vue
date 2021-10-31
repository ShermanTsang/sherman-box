<style lang="scss">
</style>

<template>
  <div class="container mx-auto">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutContainer',
  props: {
    maxWidth: {
      type: String,
      default: '1800px'
    },
    padding: {
      type: String,
      default: '0'
    }
  },
  computed: {
    style () {
      return {
        'max-width': this.maxWidth,
        padding: this.padding
      }
    }
  }
}
</script>
