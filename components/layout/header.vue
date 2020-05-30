<style lang="scss">
  .header {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    z-index: $z-index-header;
    transition: all .2s ease-in-out;
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(177,177,177, .1);

    &__main {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: $header-main-height;

      &__logo {
      }

      &__content {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        &__menu {
        }

        &__action {
          position: relative;
          margin-left: 20px;

          &:before {
            position: absolute;
            top: 0;
            bottom: 0;
            left: -20px;
            content: '';
            width: 2px;
            height: 120%;
            background-color: #ececec;
          }
        }
      }

    }

    &__navigator {
      background-color: #fff;
      padding: 0 20px;
      border-top: 1px solid #efefef;
    }

    &__navigator--fixed {
      position: fixed;
      width: 100%;
      top: 0;
    }

    &:hover {
      box-shadow: 0 2px 12px rgba(177, 177, 177, .2);
    }

  }

  .header--shadow {
    box-shadow: 0 1px 16px rgba(177, 177, 177, .2);
  }
</style>

<template>
  <header class="header" :class="{'header--shadow': status.isDisplayNavigator}">
    <div class="header__main">
      <div id="logo" class="header__main__logo">
        <Logo type="text" height="40px" />
      </div>
      <div class="header__main__content">
        <div class="header__main__content__menu">
          <ModuleMenu />
        </div>
        <div class="header__main__content__action">
          <Search />
        </div>
      </div>
    </div>
    <transition name="slideFromBottom">
      <div v-if="currentModule" id="navigator" class="header__navigator" :class="{'header__navigator--fixed': status.isDisplayNavigator}">
        <Navigator :navs="navs" :divider="currentPage.type === 'list'?'/':'>'" />
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data () {
    return {
      status: {
        isDisplayNavigator: false,
        lastScrollOffset: 0
      }
    }
  },
  computed: {
    currentPage () {
      return this.$store.getters.currentPage
    },
    currentItem () {
      return this.$store.getters.currentItem
    },
    currentModule () {
      const module = this.currentPage.module
      return module && this.$getModuleConfig(module)
    },
    statisticsModule () {
      return this.$store.getters.statisticsModule
    },
    navs () {
      if (!this.currentModule) {
        return false
      }
      if (this.currentPage.type === 'list') {
        const { name, url } = this.currentModule
        const statistics = this.statisticsModule.find(item => item.module === this.currentModule.url)
        return [
          { text: name, path: `/${url}` },
          { text: statistics ? statistics.text : '', color: '#999' }
        ]
      }
      if (this.currentPage.type === 'item') {
        const { name: moduleName, url: moduleUrl } = this.currentModule
        const { name, category, date } = this.currentItem
        const navs = [
          { text: moduleName, path: `/${moduleUrl}` }
        ]
        if (category) {
          navs.push({ text: category.name })
        }
        if (name || date) {
          const dateFormat = date ? this.$time(date).format('YYYY-MM-DD') : ''
          navs.push({ text: name || dateFormat })
        }
        return navs
      }
      return []
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const isScrollDown = (scrollOffset - this.status.lastScrollOffset) > 0
      this.status.isDisplayNavigator = isScrollDown && scrollOffset > 200
      this.status.lastScrollOffset = scrollOffset
    }
  }
}
</script>
