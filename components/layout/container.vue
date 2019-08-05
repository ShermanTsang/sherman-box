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
      type: Number,
      default: 1448
    },
    padding: {
      type: String,
      default: '0'
    }
  },
  computed: {
    style() {
      return {
        'max-width': this.maxWidth + 'px',
        'padding': this.padding
      }
    }
  }
}
</script>
