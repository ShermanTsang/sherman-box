<style lang="scss">
  .header {
    height: 74px;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    transition: all .2s ease-in-out;

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
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: right;

        &__item {
          cursor: pointer;
          flex: 1 0 auto;
          padding: 0 20px;
          font-size: 1rem;
          letter-spacing: 2px;

          a {
            color: #666;
          }

          i {
            color: #aaa;
          }
        }

        &__item--active {
          position: relative;

          a {
            color: $theme-color;
          }

          i {
            color: $theme-color;
          }

          &:after {
            position: absolute;
            content: '';
            bottom: -27px;
            left: 0;
            right: 0;
            width: 100%;
            background-color: $theme-color;
            height: 2px;
          }
        ;
        }

      }
    }

    &:hover {
      box-shadow: 0 2px 8px #f0f1f2;
    }

    @media ($screen-size-xs) {
      height: auto;
      padding: 16px;
      &__container {
        flex-flow: column nowrap;
        align-items: flex-start;

        &__menu {
          display: block;
          margin-top: 20px;
          white-space: nowrap;
          overflow-x: scroll;

          &__item {
            display:inline-block;
            padding: 0;

            &:not(:last-child) {
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <header class="header">
    <layout-container class="header__container">
      <div class="header__container__logo">
        <logo></logo>
      </div>
      <div class="header__container__menu">
        <div
          v-for="(item,index) in $store.getters.moduleCollection"
          :key="index"
          class="header__container__menu__item"
          :class="{'header__container__menu__item--active': isActiveMenu(item)}"
        >
          <nuxt-link :to="`/${item.url}`">
            <icon :name="item.icon" />
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
    return {}
  },
  mounted() {
  },
  methods: {
    isActiveMenu(menuItem) {
      const { url } = menuItem
      return this.$route.path.indexOf(url) > 0
    }
  }
}
</script>
