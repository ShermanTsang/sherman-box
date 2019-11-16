<style lang="scss">
  .toolbar {
    background-color: rgba(255, 255, 255, .95);
    overflow: hidden;
    z-index: 995;

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 10px 30px;
      overflow: hidden;

      @media ($screen-xs-max) {
        flex-flow: column nowrap;
        padding: 10px;
      }

      &__main {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;

        @media ($screen-xs-max) {
          padding: 16px 0;
        }

      }

    }

  }

  .toolbar--pinned {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin-left: 0;
    box-shadow: 10px 0 8px rgba(0, 0, 0, .1);
  }
</style>

<template>
  <div id="toolbar" class="toolbar">
    <div class="toolbar__container">
      <div class="toolbar__container__main">
        <template v-if="currentModule">
          <Navigator :navs="navs" :divider="currentPage.type === 'list'?'/':'>'"></Navigator>
        </template>
      </div>
      <div class="toolbar__container__search">
        <Search />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutToolbar',
  data() {
    return {}
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
      const toolbar = document.querySelector('#toolbar')
      if (toolbar) {
        const toolbarClassList = toolbar.classList
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 160) {
          toolbarClassList.add('toolbar--pinned')
        } else {
          toolbarClassList.remove('toolbar--pinned')
        }
      }
    }
  }
}
</script>
