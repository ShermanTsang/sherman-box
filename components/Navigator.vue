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
  <div v-if="navs && navs.length > 0" :style="style" class="navigator">
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
