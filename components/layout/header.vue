<style lang="scss">
  .header {
    height: 60px;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow: hidden;

    .header__logo {

    }

    .header__menu {
      &__item {

      }
    }
  }
</style>

<template>
  <header class="header">
    <div class="header__logo">
      <ui-logo></ui-logo>
    </div>
    <div class="header__menu">
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  asyncData(context) {
    return {}
  }
}
</script>
