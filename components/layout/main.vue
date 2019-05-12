<style lang="scss">
  .main {
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
  name: 'LayoutMain',
  asyncData(context) {
    return {}
  }
}
</script>
