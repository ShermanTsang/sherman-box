<style lang="scss">
$prefix: 'tip';

.#{$prefix} {
    padding: 16px;
    margin: 20px auto;
    background-color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    transition: all .2s ease-in-out;

    &__image {

      &__pic {
      }

    }

    &__text {
      color: $theme-color;
      letter-spacing: 2px;
      padding: 4px 16px;
      text-align: center;
      margin-top: 20px;
      font-size: .95rem;
      opacity: .8;
      border-radius: 2px;
      cursor: default;
      background-color: rgba($theme-color,.1);
    }

  }
</style>

<template>
  <div class="tip">
    <div v-if="asset" class="tip__image__pic" :style="imageStyle">
      <Pic :asset="asset" />
    </div>
    <div v-else-if="lottie" class="tip__image__pic">
      <Lottie :name="lottie" :width="Number.parseInt(width)" :height="Number.parseInt(height)" />
    </div>
    <div v-if="$slots.default && $slots.default[0]" class="tip__text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    type: {
      type: String,
      default: 'empty'
    },
    width: {
      type: [String, Number],
      default: '800px'
    },
    height: {
      type: [String, Number],
      default: '800px'
    },
    asset: {
      type: [String, undefined],
      default: undefined
    },
    lottie: {
      type: [String, undefined],
      default: undefined
    }
  },
  computed: {
    imageStyle () {
      return {
        'max-width': this.maxWidth
      }
    }
  }
}
</script>
