<style lang="scss">
  .main {
    flex: 1;
    background-color: #fff;
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
