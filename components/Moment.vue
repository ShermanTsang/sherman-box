<style lang="scss">
  .moment {
    position: relative;
    transition: all .3s ease-in-out;
    color: unset !important;

    &:hover {
      &:after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        right: 0;
        width: 100%;
        height: 2px;
        border-radius: 4px;
        opacity: .4;
        @include gradient-background;
      }
    }
  }
</style>

<template>
  <nuxt-link v-if="localTime" :to="{path:`/day/${localTime.format('YYYY-MM-DD')}`}" class="moment" :style="style">
    {{ localTime.format(format) }}
    <small v-if="fromNow">{{ fromNowFormat }}</small>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Moment',
  props: {
    time: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    type: {
      type: String,
      default: 'date'
    },
    fromNow: {
      type: Boolean,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    }
  },
  computed: {
    style() {
      return {
        color: this.color + '!important'
      }
    },
    localTime() {
      return this.$time(this.time) || undefined
    },
    isDateFormat() {
      return this.localTime.format('HH:mm:ss') === '00:00:00'
    },
    isToday() {
      return this.localTime.format('YYYY-MM-DD') === this.$time().format('YYYY-MM-DD')
    },
    fromNowFormat() {
      const expectedTimeValue = this.isDateFormat ? this.localTime.set('hour', 23).set('minute', 59) : this.localTime
      return this.isDateFormat && this.isToday ? '今天' : expectedTimeValue.from()
    }
  }
}
</script>
