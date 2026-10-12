<style scoped lang="scss">
.i-row {
  display: flex;
  flex-wrap: wrap;

  &.align-left { justify-content: flex-start; }
  &.align-right { justify-content: flex-end; }
  &.align-center { justify-content: center; }
}
</style>

<template>
  <div class="i-row" :style="rowStyle" :class="rowClass">
    <slot />
  </div>
</template>

<script setup>
import { computed, provide, toRef } from 'vue'
import { rowGutterKey } from '~/utils/layout'

defineOptions({ name: 'LayoutRow' })

const props = defineProps({
  gutter: { type: [Number, String], default: 16 },
  align: {
    type: String,
    default: 'left',
    validator: value => ['left', 'right', 'center'].includes(value)
  }
})

provide(rowGutterKey, toRef(props, 'gutter'))
const rowStyle = computed(() => ({
  marginLeft: `${-Number(props.gutter) / 2}px`,
  marginBottom: `${-Number(props.gutter) / 2}px`,
  marginRight: `${-Number(props.gutter) / 2}px`,
  marginTop: `${-Number(props.gutter) / 2}px`
}))
const rowClass = computed(() => [props.align && `align-${props.align}`])
</script>
