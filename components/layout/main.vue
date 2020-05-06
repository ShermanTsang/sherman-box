<style lang="scss">
  .main {
    flex: 1;
    overflow: hidden;
    margin-top: $header-height;
  }
</style>

<template>
  <main class="main">
    <slot />
  </main>
</template>

<script>
export default {
  name: 'LayoutMain'
}
</script>
