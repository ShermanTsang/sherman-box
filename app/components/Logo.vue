<style lang="scss">
$prefix: 'logo';

.#{$prefix} {
    cursor: pointer;
  }
</style>

<template>
  <div class="logo" @click="$router.push('/')">
    <template v-if="type === 'image'">
      <img :src="$getImageAsset('logo')" :style="style" alt="logo">
    </template>
    <template v-if="type === 'text'">
      <CustomText size="1.4rem" color="#666">
        {{ $getConfig('site.name') }}
      </CustomText>
    </template>
  </div>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {
  computed: {
    style () {
      return {
        width: this.width,
        height: this.height
      }
    }
  }
}

defineOptions({ name: "Logo" })

const legacyProps = defineProps({
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return ['text', 'icon', 'image'].includes(value)
      }
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  })

const { type, height, width } = __toRefs(legacyProps)

const { style } = useLegacyOptions(__legacyOptions, legacyProps)
</script>
