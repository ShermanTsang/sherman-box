<style lang="scss">
  .layout-container {
    margin: 0 auto;

    @media screen and (max-width: 960px) {
      width: 96%;
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
