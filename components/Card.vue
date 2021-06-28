<style lang="scss">
  .i-card {
    transition: all .2s ease-in-out;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.06);
    background-color: #ffffff;
    border-radius: 4px;
    will-change: transform;
    user-select: none;

    &:hover {
      transform: translate3d(0, -4px, 0);
      box-shadow: 0 10px 14px 0 rgba(0, 0, 0, 0.1);
    }

  }
</style>

<template>
  <div class="i-card" @click="$emit('click')">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {}
}
</script>
