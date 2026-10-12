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

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {
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

defineOptions({ name: "Icon" })

const legacyProps = defineProps({
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
  })

const { name, color, size, rotate } = __toRefs(legacyProps)

const { style } = useLegacyOptions(__legacyOptions, legacyProps)
</script>
