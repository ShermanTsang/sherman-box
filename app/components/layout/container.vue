<style lang="scss">
</style>

<template>
  <div class="container mx-auto">
    <slot />
  </div>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {
  computed: {
    style () {
      return {
        'max-width': this.maxWidth,
        padding: this.padding
      }
    }
  }
}

defineOptions({ name: "LayoutContainer" })

const legacyProps = defineProps({
    maxWidth: {
      type: String,
      default: '1800px'
    },
    padding: {
      type: String,
      default: '0'
    }
  })

const { maxWidth, padding } = __toRefs(legacyProps)

const { style } = useLegacyOptions(__legacyOptions, legacyProps)
</script>
