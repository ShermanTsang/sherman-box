<style lang="scss">
  .waterfall {

    &__item {
      box-sizing: border-box;
      break-inside: avoid;
      padding: 10px;
    }

    @media ($screen-lg-max) {
      column-count: 2 !important;
    }

    @media ($screen-sm-max) {
      column-count: 1 !important;
    }

  }
</style>

<template>
  <div class="waterfall" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Waterfall',
  props: {
    column: {
      type: [Number, String],
      default: 3
    },
    gap: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    style() {
      return {
        'column-count': this.column,
        'column-gap': this.gap
      }
    }
  }
}
</script>
