<style lang="scss">
  .card {
    transition: all .2s ease-in-out;
    box-shadow: 0 0 2px rgba(0, 0, 0, .1);
    background-color: #ffffff;

    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, .1);
    }

  }
</style>

<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {}
}
</script>
