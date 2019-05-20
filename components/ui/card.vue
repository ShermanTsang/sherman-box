<style lang="scss">
  .card {
    box-shadow: 0 0 6px rgba(0,0,0,.1);
    transition: all .2s ease-in-out;
    border: 1px solid #efefef;
    &__image {
      width: 100px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &:hover{
      box-shadow: 0 4px 6px rgba(0,0,0,.1);
    }
  }
</style>

<template>
  <div class="card">
    <slot></slot>
    <div class="card__image">
      <img :src="image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCard',
  props: {
    image: {
      type: String,
      default: null
    }
  }
}
</script>
