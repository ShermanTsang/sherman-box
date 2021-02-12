<style lang="scss">
$prefix: 'iconfont';

  .#{$prefix} {
    display: inline-block;
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
    },
    rotate: {
      type: Boolean,
      default: undefined
    }
  },
  computed: {
    style () {
      const styleObject = {
        color: this.color,
        fontSize: this.size
      }
      if (this.rotate) {
        styleObject.animation = 'rotation .4s linear infinite'
      }
      return styleObject
    }
  }
}
</script>
