<style lang="scss">
$prefix: 'slider-item';

.#{$prefix} {
  position: relative;
  overflow: auto;
}

.#{$prefix}--flex-row-center {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.#{$prefix}--flex-column-center {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <section :class="['slider-item',`slider-item--${layout}`]" :style="style">
    <slot />
  </section>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {
  computed: {
    style () {
      const styles = {}
      this.backgroundColor && (styles['background-color'] = this.backgroundColor)
      this.height && (styles['min-height'] = this.height)
      if (this.backgroundImage) {
        styles['background-image'] = `url(${this.backgroundImage})`
        styles['background-size'] = 'cover'
        styles['background-position'] = 'center center'
      }
      return styles
    }
  }
}

defineOptions({ name: "SliderItem" })

const legacyProps = defineProps({
    layout: {
      type: String,
      default: 'center'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    backgroundImage: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: '100vh'
    }
  })

const { layout, backgroundColor, backgroundImage, height } = __toRefs(legacyProps)

const { style } = useLegacyOptions(__legacyOptions, legacyProps)
</script>
