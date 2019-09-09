<style lang="scss">
  .header {
    height: 64px;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    transition: all .2s ease-in-out;
    box-shadow: 0 2px 8px #f0f1f2;

    &__container {
      margin: 0 auto 0 $sidebar-width;
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

        }

      }
    }

    @media ($screen-md-max) {
      height: auto;
      padding: 16px;

      &__container {
        position: relative;
        margin: auto;
        flex-flow: column nowrap;
        align-items: flex-start;
        white-space: nowrap;

        &__menu {
          width: 100%;
          margin-top: 20px;
          display: -webkit-box;
          overflow-x: scroll;
          overflow-scrolling: touch;

          &__item {
            display: inline-block;
            padding: 0 10px;

            &:not(:last-child) {
              margin-right: 16px;
            }

            &:last-child {
              margin-right: 40px;
            }
          }

          &::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }

        }

        &__scroll {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 20px;
          text-align: right;
          background-color: #fff;
          box-shadow: 0 -20px 20px 30px rgb(255, 255, 255);
        }
      }
    }

  }
</style>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__container__logo">
        <Logo type="text" height="36px" />
      </div>
      <div id="headerMenu" class="header__container__menu">
        <div
          v-for="(item,index) in $store.getters.moduleList"
          :key="index"
          class="header__container__menu__item"
          :class="{'header__container__menu__item--active': isActiveMenu(item)}"
        >
          <nuxt-link :to="`/${item.url}`">
            <Icon :name="item.icon" />
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
      <div class="header__container__scroll" @click="scrollMenu()">
        <Icon name="angle-right" color="#aaa" size="18px"></Icon>
      </div>
    </div>
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
      const path = this.$route.path
      const inIndexPage = url === 'timeline' && path === '/'
      return path.indexOf(url) > 0 || inIndexPage
    },
    scrollMenu() {
      const headerMenu = document.getElementById('headerMenu')
      const scrollLeft = headerMenu.scrollLeft
      headerMenu.scrollLeft = scrollLeft + 40
    }
  }
}
</script>
