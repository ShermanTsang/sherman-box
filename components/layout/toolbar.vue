<style lang="scss">
  .toolbar {
    background-color: rgba(255, 255, 255, .95);
    height: 64px;
    padding: 10px 30px;
    overflow: hidden;
    z-index: 995;

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      &__main {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }

    }

  }

  .toolbar--pinned {
    position: fixed;
    top: 0;
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
    navs() {
      if (!this.currentModule) {
        return false
      }
      if (this.currentPage.type === 'list') {
        const { name, url } = this.currentModule
        return [
          { text: name, path: `/${url}` },
          { text: '' }
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
