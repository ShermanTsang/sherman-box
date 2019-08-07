<style lang="scss">
  .nameplate {
    position: relative;
    cursor: default;
    font-size: 1.6rem;
    padding-left: 20px;
    letter-spacing: 2px;
    color: #333;
    margin-bottom: 20px;

    span {
      font-size: 1.1rem;
      color: #999;
      text-transform: capitalize;
      letter-spacing: 2px;
    }

    &:after {
      position: absolute;
      content: '';
      height: 100%;
      width: 6px;
      border-radius: 4px;
      left: 0;
      top: 0;
      bottom: 0;
      opacity: .4;
      @include gradient-background;
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
