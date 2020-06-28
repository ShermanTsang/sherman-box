<style lang="scss">
  .waterfall {

    &__item {
      box-sizing: border-box;
      break-inside: avoid;
      height: 100%; // avoid sub item overflow
      overflow: auto; // avoid sub item overflow
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
  <div ref="waterfall" class="waterfall" :style="parentStyle">
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
    parentStyle () {
      return {
        'column-count': this.column,
        'column-gap': this.gap
      }
    }
  },
  mounted () {
    this.setNodeChildrenClass()
  },
  updated () {
    this.setNodeChildrenClass()
  },
  methods: {
    setNodeChildrenClass () {
      const items = this.$slots.default
      items && items.forEach((nodeItem) => {
        if (nodeItem.tag) {
          const element = nodeItem.elm
          element.classList.add('waterfall__item')
          element.style.setProperty('margin', `${this.gap} 0`)
        }
      })
    }
  }
}
</script>
