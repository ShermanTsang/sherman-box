<style lang="scss">
  .header {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    z-index: $z-index-header;
    height: $header-height;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    transition: all .2s ease-in-out;
    background-color: rgba(255, 255, 255, .95);

    @media($screen-md-max) {
      position: relative;
      height: auto;
    }

    &__main {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;

      &__logo {
      }

      &__navigator {
      }

      &__search {
      }

    }

    &__menu {
      display: none;
      @media($screen-md-max) {
        padding: 12px 0;
        display: block;
      }
    }

    &:hover {
      box-shadow: 0 2px 10px rgba(177, 177, 177, .2);
    }

  }
</style>

<template>
  <header class="header">
    <div class="header__main">
      <transition name="slideFromUp">
        <div v-if="!currentModule || !status.isDisplayNavigator" id="logo" class="header__main__logo">
          <Logo type="text" height="36px" />
        </div>
      </transition>
      <transition name="slideFromDown">
        <div v-if="currentModule && status.isDisplayNavigator" id="navigator" class="header__main__navigator">
          <Navigator :navs="navs" :divider="currentPage.type === 'list'?'/':'>'"></Navigator>
        </div>
      </transition>
      <div class="header__main__search">
        <Search></Search>
      </div>
    </div>
    <div class="header__menu">
      <ModuleMenu type="horizontal"></ModuleMenu>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data() {
    return {
      status: {
        isDisplayNavigator: false,
        lastScrollOffset: 0
      }
    }
  },
  computed: {
    currentPage() {
      return this.$store.getters.currentPage
    },
    currentItem() {
      return this.$store.getters.currentItem
    },
    currentModule() {
      return this.currentPage.module && this.$getModuleConfig(this.currentPage.module)
    },
    statisticsModule() {
      return this.$store.getters.statisticsModule
    },
    navs() {
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
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const isScrollDown = (scrollOffset - this.status.lastScrollOffset) > 0
      this.status.isDisplayNavigator = isScrollDown && scrollOffset > 200
      this.status.lastScrollOffset = scrollOffset
    }
  }
}
</script>
