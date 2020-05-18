<style lang="scss">
  .btn {
    cursor: pointer;
    color: #666;
    padding: 8px 10px;
    letter-spacing: 2px;
    background-color: transparent;
    transition: all .2s ease-in-out;
    border: 1px solid #ddd;

    &:hover {
      border-color: transparent;
      box-shadow: 0 0 8px rgba(0, 0, 0, .1);
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
    <slot />
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
    style () {
      const fullWidth = { width: '100%' }
      const height = { height: this.height }
      const width = { width: this.width }
      return Object.assign(
        height, width, this.fullWidth ? fullWidth : ''
      )
    },
    classes () {
      return {
        'btn--colorful': this.colorful,
        'btn--disabled': this.disabled
      }
    }
  },
  methods: {}
}
</script>
