<style lang="scss">
  .card {
    transition: all .3s ease-in-out;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
    background-color: #ffffff;
    border-radius: 4px;
    will-change: transform;

    &:hover {
      transform: translate3d(0, -4px, 0);
      box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.12);
    }

  }
</style>

<template>
  <div class="card" @click="$emit('click')">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {}
}
</script>
