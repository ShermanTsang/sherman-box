<style lang="scss">
  .btn {
    cursor: pointer;
    border: 1px solid transparent;
    color: #666;
    padding: 10px;
    letter-spacing: 2px;
    background-color: #fff;
    transition: all .2s ease-in-out;

    &:hover {
      color: $theme-color;
      border-color: $theme-color;
    }
  }

  .btn--colorful {
    border: none;
    @include gradient-background;
    &:hover {
      color: #fff;
    }
  }

  .btn--disabled {
    pointer-events: none;
    color: #999;
    background-color: #efefef;
  }
</style>

<template>
  <button class="btn" :class="classes" :style="style" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    width: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: '48px'
    },
    height: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    colorful: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      const fullWidth = { width: '100%', height: '100%' }
      const height = { height: this.height }
      const width = { width: this.width }
      return Object.assign(
        height, width, this.fullWidth ? fullWidth : ''
      )
    },
    classes() {
      return {
        'btn--colorful': this.colorful,
        'btn--disabled': this.disabled
      }
    }
  },
  methods: {}
}
</script>
