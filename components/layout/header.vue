<style lang="scss">
  .header {
    height: 64px;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);

    &__container {
      margin: 0 auto;
      max-width: 1448px;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      &__logo {

      }

      &__menu {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: right;
        &__item {
          cursor: pointer;
          flex: 1 0 auto;
          padding: 0 20px;
        }
      }
    }
  }
</style>

<template>
  <header class="header">
    <layout-container class="header__container">
      <div class="header__container__logo">
        <ui-logo></ui-logo>
      </div>
      <div class="header__container__menu">
        <div v-for="(item,index) in $store.getters.moduleCollection" :key="index" class="header__container__menu__item">
          {{ item.name }}
        </div>
      </div>
    </layout-container>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data() {
    return {
    }
  },
  mounted() {
    this.getModuleCollection()
  },
  methods: {
    getModuleCollection() {
      this.$store.dispatch('moduleCollection')
    }
  }
}
</script>
