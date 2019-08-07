<style lang="scss">
  .layout-container {
    margin: 0 auto;

    @media ($screen-size-xs), ($screen-size-sm) {
      width: 95%;
    }

  }
</style>

<template>
  <div class="layout-container" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutContainer',
  props: {
    maxWidth: {
      type: String,
      default: '1600px'
    },
    padding: {
      type: String,
      default: '0'
    }
  },
  computed: {
    style() {
      return {
        'max-width': this.maxWidth,
        'padding': this.padding
      }
    }
  }
}
</script>
