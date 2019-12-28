<style lang="scss">
  .navigator {
    cursor: default;

    &__item {
      letter-spacing: 1px;
      display: inline-block;
      font-size: .95rem;
      color: #666;

      &:not(:first-child) {
        margin-left: 10px;
      }

      &__module {
        color: $theme-color;
        padding: 4px 12px;
        border-radius: 4px;
        background-color: rgba($theme-color,0.1);
      }

      &__divider {
        color: #ccc;
      }

    }

  }
</style>

<template>
  <div v-if="navs && navs.length > 0" :style="style" class="navigator">
    <div v-for="(item,index) in navs" :key="index" :style="{color: item.color || '#666',cursor: item.path ? 'pointer':'default'}" @click="clickNavItem(item)" class="navigator__item">
      <span :class="{'navigator__item__module':index===0}">{{ item.text }}</span>
      <template v-if="index !== navs.length - 1">
        <Icon v-if="!divider" name="angle-right" color="#ccc" />
        <span v-else class="navigator__item__divider">{{ divider }}</span>
      </template>
    </div>
    <slot />
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
      default() {
        return []
      }
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  methods: {
    clickNavItem(item) {
      if (item.path) {
        this.$router.push({ path: item.path })
      }
    }
  }
}
</script>
