<style lang="scss">
  .main {
    background-color: #fff;
    flex: 1;
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
