<style lang="scss">
  .waterfall {

    &__item {
      box-sizing: border-box;
      break-inside: avoid;
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
  <div ref="waterfall" class="waterfall" :style="style">
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
    style () {
      return {
        'column-count': this.column,
        'column-gap': this.gap
      }
    }
  },
  mounted () {
    this.setNodeChildrenClass()
  },
  methods: {
    setNodeChildrenClass () {
      // 未生效 待研究
      // this.$nextTick(() => {
      //   const waterfallChildren = this.$refs.waterfall.children
      //   if (waterfallChildren && waterfallChildren.length > 0) {
      //     waterfallChildren.forEach((item) => {
      //       item.classList.add('waterfall__item')
      //     })
      //   }
      // })
    }
  }
}
</script>
