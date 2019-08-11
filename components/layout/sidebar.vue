<style lang="scss">
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 200px;
    background-color: #ffffff;
    border-right: 1px solid #eee;
    overflow: hidden;
    transition: all .2s ease-in-out;
    box-shadow: 0 2px 8px #f0f1f2;

    &:hover {
      box-shadow: 0 2px 20px #f0f1f2;
    }

    &__container {
      margin: 0 auto;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      &__logo {
        padding: 20px 0;
        text-align: center;
      }

      &__menu {
        margin-top: 20px;
        flex: 1 0;

        &__item {
          line-height: 60px;
          height: 60px;
          cursor: pointer;
          flex: 1 0 auto;
          padding: 0 20px;
          font-size: 1.1rem;
          letter-spacing: 4px;
          color: #666;
          text-overflow: ellipsis;
          overflow: hidden;

          &:not(:last-child) {
            border-bottom: 1px solid #eee;
          }

          i {
            color: #aaa;
            margin-right: 10px;
          }

          span {
            letter-spacing: 1px;
            font-size: .8rem;
            color: #999;
            text-transform: capitalize;
          }
        }

        &__item--active {
          border-bottom: none !important;
          position: relative;
          box-shadow: 0 0 1px $theme-color;
          @include gradient-background;
        }

      }

    }

    @media ($screen-xs) {
      height: auto;
      padding: 16px;

      &__container {
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
            overflow: hidden;

            &:not(:last-child) {
              margin-right: 16px;
            }
          }

          &::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }

        }
      }
    }

    &:hover {
      box-shadow: 0 2px 8px #f0f1f2;
    }

  }
</style>

<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__container__logo">
        <logo></logo>
      </div>
      <div class="sidebar__container__menu">
        <div
          v-for="(item,index) in $store.getters.moduleCollection"
          :key="index"
          class="sidebar__container__menu__item"
          :class="{'sidebar__container__menu__item--active': isActiveMenu(item)}"
          @click="$router.push(`/${item.url}`)"
        >
          <icon :name="item.icon" size="1.2rem" />
          {{ item.name }}
          <span>{{ item.url }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutSidebar',
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
    }
  }
}
</script>
