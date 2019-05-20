<style lang="scss">
  .header {
    height: 74px;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);

    &__container {
      margin: 0 auto;
      max-width: 1448px;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
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
          font-size: .95rem;
          letter-spacing: 2px;
          a{color: #666;}
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
          <nuxt-link :to="`/${item.url}`">
            {{ item.name }}
          </nuxt-link>
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
  },
  methods: {
  }
}
</script>
