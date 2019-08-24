<style lang="scss">
  .iconfont {
    letter-spacing: 1px;
  }
</style>

<template>
  <i v-if="name" :class="`iconfont icon-${name}`" :style="style" @click="$emit('click')" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    style() {
      return {
        color: this.color,
        fontSize: this.size
      }
    }
  }
}
</script>
