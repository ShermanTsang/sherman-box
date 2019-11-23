<style lang="scss">
  .main {
    background-color: #fff;
    flex: 1;
    overflow: hidden;
    margin-top: $header-height;

    @media($screen-md-max) {
      margin-top: 0;
    }

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
