<style lang="scss">
  .menu--vertical {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    &__item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      width: 100%;
      cursor: pointer;
      padding: 20px 16px;
      font-size: .95rem;
      color: #888;
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
        margin-left: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: 4px;

        span {
          margin-left: 6px;
          letter-spacing: 1px;
          font-size: .8rem;
          color: #999;
          text-transform: capitalize;
        }
      }

      &:hover {
        .sidebar__container__menu--vertical__item__icon {
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

  .menu--horizontal {
    height: 100%;
    position: relative;
    overflow: hidden;

    &__content {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: right;
      white-space: nowrap;

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

      @media ($screen-md-max) {
        width: 100%;
        margin-top: 20px;
        display: -webkit-box;
        overflow-x: scroll;
        white-space: nowrap;
        overflow-scrolling: touch;

        &__item {
          display: inline-block;
          padding: 0 10px;

          &:not(:last-child) {
            margin-right: 12px;
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

    }

    &__scrollbar {
      display: none;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 20px;
      text-align: right;
      background-color: #fff;
      box-shadow: 0 -20px 20px 30px rgb(255, 255, 255);
      @media($screen-md-max) {
        display: block;
      }
    }

  }
</style>

<template>
  <div class="menu">
    <div v-if="type === 'vertical'" class="menu--vertical">
      <div
        v-for="(item,index) in $store.getters.moduleList"
        :key="index"
        class="menu--vertical__item"
        :class="{'menu--vertical__item--active': isActiveMenu(item)}"
        @click="$router.push(`/${item.url}`)"
      >
        <div class="menu--vertical__item__icon">
          <Icon :name="item.icon" size="24px" />
        </div>
        <div class="menu--vertical__item__name">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div v-if="type === 'horizontal'" class="menu--horizontal">
      <div id="headerHorizontalMenu" class="menu--horizontal__content">
        <div
          v-for="(item,index) in $store.getters.moduleList"
          :key="index"
          class="menu--horizontal__content__item"
          :class="{'menu--horizontal__content__item--active': isActiveMenu(item)}"
        >
          <nuxt-link :to="`/${item.url}`">
            <Icon :name="item.icon" />
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
      <div class="menu--horizontal__scrollbar" @click="scrollHorizontalMenu()">
        <Icon name="angle-right" color="#aaa" size="18px"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    type: {
      type: String,
      default: 'horizontal'
    }
  },
  methods: {
    isActiveMenu(menuItem) {
      const { url } = menuItem
      const path = this.$route.path
      const inIndexPage = url === 'timeline' && path === '/'
      return path.indexOf(url) > 0 || inIndexPage
    },
    scrollHorizontalMenu() {
      const headerHorizontalMenu = document.getElementById('headerHorizontalMenu')
      const scrollLeft = headerHorizontalMenu.scrollLeft
      headerHorizontalMenu.scrollLeft = scrollLeft + 40
    }
  }
}
</script>
