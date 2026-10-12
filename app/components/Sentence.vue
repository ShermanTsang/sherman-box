<style lang="scss">
$prefix: 'sentence';

.#{$prefix} {
  font-family: $font-family-base;
  @apply tracking-wide
}
</style>

<template>
  <div class="sentence" :style="style">
    <slot />
  </div>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {
  computed: {
    style () {
      const styles = {}
      this.font && (styles['font-family'] = this.font)
      this.letterSpace && (styles['letter-space'] = this.letterSpace)
      this.color && (styles.color = this.color)
      this.size && (styles['font-size'] = this.size)
      this.height && (styles['line-height'] = this.height)
      this.display && (styles.display = this.display)
      return styles
    }
  }
}

defineOptions({ name: "Sentence" })

const legacyProps = defineProps({
    font: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    },
    letterSpace: {
      type: String,
      default: '1px'
    },
    height: {
      type: String,
      default: undefined
    },
    display: {
      type: String,
      default: 'block'
    }
  })

const { font, size, color, letterSpace, height, display } = __toRefs(legacyProps)

const { style } = useLegacyOptions(__legacyOptions, legacyProps)
</script>
