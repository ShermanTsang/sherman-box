<style lang="scss">
$prefix: 'slider';

.#{$prefix} {
    transition: all .3s ease-in-out;
  }
</style>

<template>
  <div class="slider">
    <slot />
  </div>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {

}

defineOptions({ name: "Slider" })

const legacyProps = defineProps({})

useLegacyOptions(__legacyOptions, legacyProps)
</script>
