<style lang="scss">
  .card {
    transition: all .4s ease-in-out;
    border: 1px solid #eee;
    background-color: #ffffff;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, .1);
    }

  }
</style>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {}
}
</script>
