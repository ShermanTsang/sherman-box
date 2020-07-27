<style lang="scss">
  .navigator {
    height: $header-nav-height;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    &__main {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;

      &__item {
        letter-spacing: 1px;
        display: inline-block;
        font-size: .95rem;
        color: #666;
        cursor: default;

        &:not(:first-child) {
          margin-left: 10px;
        }

        &__module {
          display: inline-block;
          color: $theme-color;
          padding: 4px 12px;
          border-radius: 4px;
          background-color: rgba($theme-color, 0.1);
        }

        &__divider {
          color: #ccc;
        }

      }

    }

    &__action {
      box-shadow: 0 -20px 20px 30px rgb(255, 255, 255);
      flex-shrink: 0;

      &__item {
        cursor: pointer;
        display: inline-block;
        padding: 10px;
        border-radius: 4px;
        color: $theme-color;

        &:not(:first-child) {
          margin-left: 6px;
        }

        &:hover {
          background-color: rgba(177, 177, 177, .1);
        }
      }
    }

  }
</style>

<template>
  <div v-if="navs && navs.length > 0" class="navigator">
    <div class="navigator__main">
      <div
        v-for="(item,index) in navs"
        :key="index"
        :style="{color: item.color || '#666',cursor: item.path ? 'pointer':'default'}"
        class="navigator__main__item"
        @click="clickNavItem(item)"
      >
        <template v-if="index === 0">
          <span :class="{'navigator__main__item__module':index === 0}">{{ item.text }}</span>
        </template>
        <template v-else>
          {{ item.text }}
        </template>
        <template v-if="index !== navs.length - 1 && navs.length > 1">
          <Icon v-if="!divider" name="angle-right" color="#ccc" />
          <span v-else class="navigator__main__item__divider">{{ divider }}</span>
        </template>
      </div>
      <slot />
    </div>
    <div class="navigator__action">
      <div class="navigator__action__item" @click="backToTop()">
        <Icon name="arrow-up" color="#999" size="20px"></Icon>
      </div>
      <div v-if="currentItem && 'name' in currentItem" class="navigator__action__item" @click="openPoster()">
        <Icon name="share" color="#999" size="20px"></Icon>
      </div>
    </div>
    <Modal v-model="status.showPoster" title="海报分享" icon="share" width="540px">
      <Poster
        :module="currentPage.module"
        :image="currentItem.image"
        :text-template="currentModule.poster_text"
        :fields="[{field: 'name',value: currentItem.name},{field: 'date',value: currentItem.date}]"
      />
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Navigator',
  props: {
    divider: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      status: {
        showPoster: false
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
          if (category.parent_category && 'name' in category.parent_category) {
            navs.push({ text: category.parent_category.name })
          }
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
  watch: {
    navs (value) {
      this.$store.commit('SET_HAS_NAVIGATOR', !!value)
    }
  },
  created () {
    this.$store.commit('SET_HAS_NAVIGATOR', this.navs)
  },
  methods: {
    clickNavItem (item) {
      if (item.path) {
        this.$router.push({ path: item.path })
      }
    },
    backToTop () {
      document.body.scrollIntoView()
    },
    openPoster () {
      this.status.showPoster = true
    }
  }
}
</script>
