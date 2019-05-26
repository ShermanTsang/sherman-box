<style lang="scss">
  .nameplate {
    cursor: default;
    font-size: 2rem;
    letter-spacing: 4px;

    span {
      font-size: 1.4rem;
      color: #999;
      text-transform: capitalize;
      letter-spacing: 2px;
    }
  }
</style>

<template>
  <div class="nameplate">
    {{ title }} <span>{{ subTitle }}</span>
  </div>
</template>

<script>
export default {
  name: 'Nameplate',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
