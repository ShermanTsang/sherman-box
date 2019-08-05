<style lang="scss">
  .nameplate {
    cursor: default;
    font-size: 1.6rem;
    letter-spacing: 2px;
    color: #333;

    span {
      font-size: 1.1rem;
      color: #999;
      text-transform: capitalize;
      letter-spacing: 2px;
    }
  }
</style>

<template>
  <div class="nameplate">
    {{ title }} <span>{{ subTitle }}</span>
    <blocker height="20px" />
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
