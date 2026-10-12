<style scoped lang="scss">
.i-col {
  $class-prefix: i-col-;

  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: math.div($n, 24) * 100%;
    }
  }
  $class-prefix: i-offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: math.div($n, 24) * 100%;
    }
  }

  @media ($screen-xs-max) {
    $class-prefix: i-col-xs-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: math.div($n, 24) * 100%;
      }
    }
    $class-prefix: i-offset-xs-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: math.div($n, 24) * 100%;
      }
    }
  }

  @media ($screen-sm-min) {
    $class-prefix: i-col-sm-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: math.div($n, 24) * 100%;
      }
    }
    $class-prefix: i-offset-sm-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: math.div($n, 24) * 100%;
      }
    }
  }

  @media ($screen-md-min) {
    $class-prefix: i-col-md-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: math.div($n, 24) * 100%;
      }
    }
    $class-prefix: i-offset-md-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: math.div($n, 24) * 100%;
      }
    }
  }

  @media ($screen-lg-min) {
    $class-prefix: i-col-lg-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: math.div($n, 24) * 100%;
      }
    }
    $class-prefix: i-offset-lg-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: math.div($n, 24) * 100%;
      }
    }
  }

  @media ($screen-xl-min) {
    $class-prefix: i-col-xl-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: math.div($n, 24) * 100%;
      }
    }
    $class-prefix: i-offset-xl-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: math.div($n, 24) * 100%;
      }
    }
  }

  @media ($screen-xxl-min) {
    $class-prefix: i-col-xxl-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: math.div($n, 24) * 100%;
      }
    }
    $class-prefix: i-offset-xxl-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: math.div($n, 24) * 100%;
      }
    }
  }

}
</style>

<template>
  <div class="i-col" :class="colClass" :style="colStyle">
    <slot/>
  </div>
</template>

<script setup>
import { computed, inject, ref, unref } from 'vue'
import { rowGutterKey } from '~/utils/layout'

defineOptions({ name: 'LayoutCol' })

const props = defineProps({
  span: { type: [Number, String], default: 24 },
  offset: { type: [Number, String], default: 0 },
  xs: { type: Object, default: () => ({}) },
  sm: { type: Object, default: () => ({}) },
  md: { type: Object, default: () => ({}) },
  lg: { type: Object, default: () => ({}) },
  xl: { type: Object, default: () => ({}) },
  xxl: { type: Object, default: () => ({}) }
})

const gutter = inject(rowGutterKey, ref(0))
function createClasses (value, prefix = '') {
  if (!value) return []
  const classes = []
  if (value.span) classes.push(`i-col-${prefix}${value.span}`)
  if (value.offset) classes.push(`i-offset-${prefix}${value.offset}`)
  return classes
}
const colClass = computed(() => [
  ...createClasses({ span: props.span, offset: props.offset }),
  ...createClasses(props.xs, 'xs-'),
  ...createClasses(props.sm, 'sm-'),
  ...createClasses(props.md, 'md-'),
  ...createClasses(props.lg, 'lg-'),
  ...createClasses(props.xl, 'xl-'),
  ...createClasses(props.xxl, 'xxl-')
])
const colStyle = computed(() => ({
  paddingLeft: `${Number(unref(gutter)) / 2}px`,
  paddingRight: `${Number(unref(gutter)) / 2}px`,
  paddingTop: `${Number(unref(gutter)) / 2}px`,
  paddingBottom: `${Number(unref(gutter)) / 2}px`
}))
</script>
