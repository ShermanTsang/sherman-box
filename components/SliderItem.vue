<style lang="scss">
$prefix: 'slider-item';

.#{$prefix} {
  position: relative;
  overflow: auto;
}

.#{$prefix}--flex-row-center {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.#{$prefix}--flex-column-center {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <section :class="['slider-item',`slider-item--${layout}`]" :style="style">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'SliderItem',
  props: {
    layout: {
      type: String,
      default: 'center'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    backgroundImage: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: '100vh'
    }
  },
  computed: {
    style () {
      const styles = {}
      this.backgroundColor && (styles['background-color'] = this.backgroundColor)
      this.height && (styles['min-height'] = this.height)
      if (this.backgroundImage) {
        styles['background-image'] = `url(${this.backgroundImage})`
        styles['background-size'] = 'cover'
        styles['background-position'] = 'center center'
      }
      return styles
    }
  }
}
</script>
