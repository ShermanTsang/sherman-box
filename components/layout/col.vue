<style scoped lang="scss">
  .col {
    $class-prefix: col-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }

    @media ($screen-xs-max) {
      $class-prefix: col-xs-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-xs-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media ($screen-sm-min) {
      $class-prefix: col-sm-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-sm-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media ($screen-md-min) {
      $class-prefix: col-md-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-md-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media ($screen-lg-min) {
      $class-prefix: col-lg-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-lg-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media ($screen-xl-min) {
      $class-prefix: col-xl-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-xl-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media ($screen-xxl-min) {
      $class-prefix: col-xxl-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-xxl-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

  }
</style>

<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
const validator = (value) => {
  const keys = Object.keys(value)
  let valid = true
  keys.forEach((key) => {
    if (!['span', 'offset'].includes(key)) {
      valid = false
    }
  })
  return valid
}

export default {
  name: 'LayoutCol',
  props: {
    span: {
      type: [Number, String],
      default: 24
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    sm: {
      type: Object,
      validator,
      default: () => {
        return {}
      }
    },
    md: {
      type: Object,
      validator,
      default: () => {
        return {}
      }
    },
    lg: {
      type: Object,
      validator,
      default: () => {
        return {}
      }
    },
    xl: {
      type: Object,
      validator,
      default: () => {
        return {}
      }
    }
  },
  data() { // create
    return {
      gutter: 0
    }
  },
  computed: { // mounted，gutter变了，colStyle也变
    colClass() {
      const { span, offset, xs, sm, md, lg, xl, xxl } = this
      // let createClasses = this.createClasses
      return [
        ...this.createClasses({ span, offset }),
        ...this.createClasses(xs, 'xs-'),
        ...this.createClasses(sm, 'sm-'),
        ...this.createClasses(md, 'md-'),
        ...this.createClasses(lg, 'lg-'),
        ...this.createClasses(xl, 'xl-'),
        ...this.createClasses(xxl, 'xxl-')
      ]
    },
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px'
      }
    }
  },
  methods: {
    createClasses(obj, str = '') {
      if (!obj) { return [] } // 值为 undefined 会产生 bug
      const array = []
      if (obj.span) { array.push(`col-${str}${obj.span}`) } // 关联scss的绑定动态变量
      if (obj.offset) { array.push(`offset-${str}${obj.offset}`) }
      return array
    }
  }
}
</script>
