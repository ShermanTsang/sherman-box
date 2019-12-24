<style lang="scss">
  .view {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background-color: #f8f8f8;
  }
</style>

<template>
  <div class="view">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutView'
}
</script>
