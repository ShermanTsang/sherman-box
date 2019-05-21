<style lang="scss">
  .card {
    box-shadow: 0 0 2px rgba(0,0,0,.1);
    transition: all .2s ease-in-out;
    border: 1px solid rgba(177,177,177,.1);
    background-color: #ffffff;
    &:hover{
      box-shadow: 0 4px 12px rgba(0,0,0,.1);
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
  props: {
    image: {
      type: String,
      default: null
    }
  }
}
</script>
