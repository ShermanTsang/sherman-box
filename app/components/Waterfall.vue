<style lang="scss">
$prefix: 'waterfall';

.#{$prefix} {

  &__item {
    box-sizing: border-box;
    break-inside: avoid;
    page-break-inside: avoid;
    //height: 100%; // avoid sub item overflow
    //overflow: auto; // avoid sub item overflow
  }

  @media ($screen-lg-max) {
    column-count: 2 !important;
  }

  @media ($screen-sm-max) {
    column-count: 1 !important;
  }

}
</style>

<template>
  <div ref="waterfall" class="waterfall py-4" :style="parentStyle">
    <slot />
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue'

defineOptions({ name: 'Waterfall' })

const props = defineProps({
  column: { type: [Number, String], default: 3 },
  gap: { type: [Number, String], default: 0 }
})

const waterfall = ref(null)
const parentStyle = computed(() => ({
  'column-count': props.column,
  'column-gap': props.gap
}))

function setNodeChildrenClass () {
  waterfall.value?.querySelectorAll(':scope > *').forEach(element => element.classList.add('waterfall__item'))
}

onMounted(setNodeChildrenClass)
onUpdated(setNodeChildrenClass)
</script>
