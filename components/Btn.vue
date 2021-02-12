<style lang="scss">
$prefix: 'btn';

.#{$prefix} {
  cursor: pointer;
  color: #999;
  padding: 8px 10px;
  letter-spacing: 2px;
  background-color: transparent;
  transition: all .2s ease-in-out;
  border: 1px solid #efefef;
  box-shadow: 0 0 4px rgba(0, 0, 0, .1);

  &:hover {
    color: #666;
    border-color: transparent;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
  }
}

.#{$prefix}--colorful {
  border: none;
  @include gradient-background;

  &:hover {
    color: #fff;
  }
}

.#{$prefix}--disabled {
  pointer-events: none;
  color: #999;
  background-color: #efefef;
}
</style>

<template>
  <button class="btn" :class="classes" :style="style" @click="handleClick">
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
    },
    to: {
      type: [String, Object],
      default: undefined
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
  methods: {
    handleClick () {
      this.$emit('click')
      this.to && this.pushRouter()
    },
    pushRouter () {
      this.$router.push(this.to)
    }
  }
}
</script>
