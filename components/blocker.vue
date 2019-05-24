<style lang="scss">
  .blocker {
    display: flex;
    color: #999;
    font-size: .9rem;
    align-items: center;
    justify-content: center;
    cursor: default;
  }
</style>

<template>
  <div class="blocker" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Blocker',
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      return {
        height: this.height + 'px'
      }
    }
  }
}
</script>
