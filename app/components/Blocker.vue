<style lang="scss">
$prefix: 'blocker';

  .#{$prefix} {
    display: flex;
    color: #999;
    font-size: .9rem;
    align-items: center;
    justify-content: center;
    cursor: default;

    &__divider {
      height: 1px;
      width: 100%;
      background-color: rgba(177, 177, 177, .1);
    }
  }
</style>

<template>
  <div class="blocker" :style="style">
    <div v-if="divider" class="blocker__divider" :style="dividerStyle"></div>
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
        height: this.height,
        width: this.width
      }
    },
    dividerStyle () {
      return {
        width: this.dividerWidth,
        height: this.dividerHeight
      }
    }
  }
}

defineOptions({ name: "Blocker" })

const legacyProps = defineProps({
    height: {
      type: String,
      default: '0'
    },
    width: {
      type: String,
      default: '100%'
    },
    dividerWidth: {
      type: String,
      default: '100%'
    },
    dividerHeight: {
      type: String,
      default: '1px'
    },
    divider: {
      type: Boolean,
      default: undefined
    }
  })

const { height, width, dividerWidth, dividerHeight, divider } = __toRefs(legacyProps)

const { dividerStyle, style } = useLegacyOptions(__legacyOptions, legacyProps)
</script>
