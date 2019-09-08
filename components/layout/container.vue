<style lang="scss">
  .layout-container {
    margin: 0 auto;

    @media ($screen-xs-max) {
      width: 95%;
    }

    @media ($screen-sm-min) {
      width: 92%;
    }

    @media ($screen-md-min) {
      width: 90%;
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
      default: '1800px'
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
        padding: this.padding
      }
    }
  }
}
</script>
