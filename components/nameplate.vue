<style lang="scss">
  .nameplate {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    &__title {
      cursor: default;
      font-size: 1.45rem;
      letter-spacing: 2px;
      color: #333;
      position: relative;

      span {
        font-size: 1.1rem;
        color: #999;
        text-transform: capitalize;
      }

      &:after {
        position: absolute;
        content: '';
        height: 6px;
        width: 40px;
        border-radius: 4px;
        left: 0;
        bottom: -20px;
        opacity: .8;
        @include gradient-background;
      }
    }

    &__action {
      float: right;
    }

    @media ($screen-xs-max) {
      .nameplate {
        &__title {
          &:after {
            left: 10px;
          }

          padding-left: 10px;
        }
      }

    }

  }
</style>

<template>
  <div class="nameplate">
    <div class="nameplate__title">
      {{ title }}
      <span>{{ subTitle }}</span>
    </div>
    <div class="nameplate__action">
      <slot></slot>
    </div>
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
