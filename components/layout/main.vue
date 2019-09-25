<style lang="scss">
  .main {
    background-color: #f9f9f9;
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
