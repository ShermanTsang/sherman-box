<style lang="scss">
  .container {
    margin: 0 auto;

    @media screen and (max-width: 960px) {
      width: 90%;
    }
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
