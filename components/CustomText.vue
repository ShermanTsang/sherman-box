<style lang="scss">
$prefix: 'custom-text';

  .#{$prefix} {
    font-family: SourceHanSerifCN-SemiBold, $font-family-base;
  }
</style>

<template>
  <div class="custom-text" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    font: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    },
    letterSpace: {
      type: String,
      default: '1px'
    },
    height: {
      type: String,
      default: undefined
    },
    display: {
      type: String,
      default: 'block'
    }
  },
  computed: {
    style () {
      const styles = {}
      this.font && (styles['font-family'] = this.font)
      this.letterSpace && (styles['letter-space'] = this.letterSpace)
      this.color && (styles.color = this.color)
      this.size && (styles['font-size'] = this.size)
      this.height && (styles['line-height'] = this.height)
      this.display && (styles.display = this.display)
      return styles
    }
  }
}
</script>
