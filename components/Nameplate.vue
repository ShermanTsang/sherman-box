<style lang="scss">
$prefix: 'nameplate';

.#{$prefix} {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    &__title {
      cursor: default;
      font-size: 1.3rem;
      letter-spacing: 2px;
      color: #333;
      position: relative;
      z-index: $z-index-card-content;

      span {
        font-size: 1.1rem;
        color: #999;
        text-transform: capitalize;
      }

      &:after {
        position: absolute;
        content: '';
        height: 20px;
        width: 100%;
        border-radius: 10px;
        right: 0;
        left: 6px;
        top: 10px;
        opacity: .4;
        z-index: -1;
        background-color: #1170f5;
        background-image: linear-gradient(90deg, #d2feff 0, #9faffc);
      }
    }

    &__action {
    }

    @media ($screen-xs-max) {
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;

        &__title {
          &:after {
            left: 10px;
          }

          padding-left: 10px;
        }

      &__action {
        margin-top: 20px;
        align-self: flex-end;
        border-bottom: 1px solid #eee;
      }
    }

  }
</style>

<template>
  <div class="nameplate">
    <div class="nameplate__title web-font">
      {{ title }}
      <slot name="title" />
      <span>{{ subTitle }}<slot name="subTitle" /></span>
    </div>
    <div class="nameplate__action">
      <slot />
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
