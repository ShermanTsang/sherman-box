<style lang="scss">
  .slider {
    transition: all .3s ease-in-out;
  }
</style>

<template>
  <div class="slider">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {}
}
</script>
