<style lang="scss">
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: $sidebar-width;
    background-color: #ffffff;
    overflow: hidden;
    transition: all .2s ease-in-out;

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
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        flex: 1 0;

        &__item {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          width: 100%;
          cursor: pointer;
          padding: 20px 16px;
          font-size: 1rem;
          letter-spacing: 2px;
          color: #666;
          text-overflow: ellipsis;
          overflow: hidden;
          transition: border-radius .2s ease-in-out;

          &__icon {
            transition: all .25s ease-in-out;
            transform-origin: center bottom;

            i {
              color: #aaa;
              margin-right: 10px;
            }
          }

          &__name {
            margin-left: 6px;

            span {
              margin-left: 6px;
              letter-spacing: 1px;
              font-size: .8rem;
              color: #999;
              text-transform: capitalize;
            }
          }

          &:hover {
            .sidebar__container__menu__item__icon {
              transform: rotate(-15deg);
            }
          }
        }

        &__item--active {
          position: relative;
          @include gradient-background;

          &:hover {
            border-radius: 0;
          }
        }

      }

    }

    &:hover {
      box-shadow: 0 0 12px rgba(0,0,0,.1);
    }

    @media ($screen-xs-max) {
      height: auto;
      padding: 16px;

      &__container {
        flex-flow: column nowrap;
        align-items: flex-start;
        white-space: nowrap;

        &__menu {
          margin-top: 20px;
          display: -webkit-box;
          overflow-x: scroll;
          overflow-scrolling: touch;

          &__item {
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

  }
</style>

<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__container__logo">
        <Logo type="text" width="85%" />
      </div>
      <div class="sidebar__container__menu">
        <div
          v-for="(item,index) in $store.getters.moduleList"
          :key="index"
          class="sidebar__container__menu__item"
          :class="{'sidebar__container__menu__item--active': isActiveMenu(item)}"
          @click="$router.push(`/${item.url}`)"
        >
          <div class="sidebar__container__menu__item__icon">
            <Icon :name="item.icon" size="24px" />
          </div>
          <div class="sidebar__container__menu__item__name">
            {{ item.name }}<span>{{ item.url }}</span>
          </div>
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
