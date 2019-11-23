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

      &__divider {
        color: #ccc;
      }

    }

  }
</style>

<template>
  <div v-if="navs && navs.length > 0" class="navigator" :style="style">
    <div v-for="(item,index) in navs" :key="index" :style="{color: item.color || '#666',cursor: item.path ? 'pointer':'default'}" class="navigator__item" @click="clickNavItem(item)">
      {{ item.text }}
      <template v-if="index !== navs.length - 1">
        <Icon v-if="!divider" name="angle-right" color="#ccc" />
        <span v-else class="navigator__item__divider">{{ divider }}</span>
      </template>
    </div>
    <slot></slot>
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
