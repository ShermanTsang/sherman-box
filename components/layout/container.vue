<style lang="scss">
  .container {
    margin: 0 auto;
    max-width: 1448px;
    overflow: hidden;
  }
</style>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutContainer'
}
</script>
