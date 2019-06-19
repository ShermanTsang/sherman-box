<style lang="scss">
  .container {
    margin: 0 auto;
  }
</style>

<template>
  <div class="container" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    maxWidth: {
      type: Number,
      default: 1448
    }
  },
  computed: {
    style() {
      return {
        'max-width': this.maxWidth + 'px'
      }
    }
  }
}
</script>
