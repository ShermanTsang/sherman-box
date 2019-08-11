<style lang="scss">
  .card {
    transition: all .2s ease-in-out;
    box-shadow: 0 0 6px rgba(177,177,177,.4);
    background-color: #ffffff;
    border-radius: 4px;
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
  }
}
</script>
