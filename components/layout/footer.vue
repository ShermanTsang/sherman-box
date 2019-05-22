<style lang="scss">
  .footer {
    padding: 10px 20px;
    height: 80px;
    border-top: 1px solid #eee;
    box-shadow: 0 0 6px rgba(0,0,0,.1);
  }
</style>

<template>
  <footer class="footer">
    <layout-container>
      {{ $store.getters.pageCollection }}
    </layout-container>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>
