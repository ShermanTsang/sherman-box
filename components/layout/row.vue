<style scoped lang="scss">
  .row {
    display: flex;
    flex-wrap: wrap; // 允许换行，当row的两个col的span值都为24时，就呈现两行
    &.align-left {
      justify-content: flex-start;
    }

    &.align-right {
      justify-content: flex-end;
    }

    &.align-center {
      justify-content: center;
    }
  }
</style>

<template>
  <div class="row" :style="rowStyle" :class="rowClass">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutRow',
  props: {
    gutter: {
      type: [Number, String],
      default: 16
    },
    align: {
      type: String,
      default: 'left',
      validator (value) {
        return ['left', 'right', 'center'].includes(value)
      }
    }
  },
  computed: {
    rowStyle () {
      return {
        marginLeft: -this.gutter / 2 + 'px',
        marginBottom: -this.gutter / 2 + 'px',
        marginRight: -this.gutter / 2 + 'px',
        marginTop: -this.gutter / 2 + 'px'
      }
    },
    rowClass () {
      const { align } = this
      return [align && `align-${align}`]
    }
  },
  created () {
    this.setColGutter()
  },
  mounted () {
    this.setColGutter()
  },
  updated () {
    this.setColGutter()
  },
  methods: {
    setColGutter () {
      this.$children.forEach((item) => {
        item.gutter = this.gutter
      })
    }
  }
}
</script>
