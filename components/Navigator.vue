<style lang="scss">
  .navigator {
    height: $header-nav-height;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    &__main {
      font-size: 0;

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
      &__item {
        cursor: pointer;
        display: inline-block;
        padding: 10px;
        margin: 0 10px;
        border-radius: 4px;
        color: $theme-color;

        &:hover {
          background-color: rgba(177,177,177, .1);
        }
      }
    }

  }
</style>

<template>
  <div v-if="navs && navs.length > 0" :style="style" class="navigator">
    <div class="navigator__main">
      <div
        v-for="(item,index) in navs"
        :key="index"
        :style="{color: item.color || '#666',cursor: item.path ? 'pointer':'default'}"
        class="navigator__main__item"
        @click="clickNavItem(item)"
      >
        <span :class="{'navigator__main__item__module':index===0}">{{ item.text }}</span>
        <template v-if="index !== navs.length - 1">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigator',
  props: {
    divider: {
      type: String,
      default: undefined
    },
    navs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    clickNavItem (item) {
      if (item.path) {
        this.$router.push({ path: item.path })
      }
    },
    backToTop () {
      document.body.scrollIntoView()
    }
  }
}
</script>
