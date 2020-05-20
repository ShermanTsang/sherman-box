<style lang="scss">
  .moment {
    position: relative;
    transition: all .3s ease-in-out;
    color: unset !important;
  }
</style>

<template>
  <nuxt-link v-if="localTime" :to="{path:`/day/${localTime.format('YYYY-MM-DD')}`}" class="moment" :style="style">
    {{ localTime.format(timeFormat) }}
    <small v-if="fromNow">{{ fromNowFormat }}</small>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Datetime',
  props: {
    time: {
      type: String,
      default: null
    },
    format: {
      type: [String, undefined],
      default: undefined
    },
    type: {
      type: String,
      default: 'date',
      validator (value) {
        return ['date', 'datetime'].includes(value)
      }
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
    style () {
      return {
        color: this.color + '!important'
      }
    },
    localTime () {
      return this.$time(this.time) || undefined
    },
    isDateFormat () {
      return this.localTime.format('HH:mm:ss') === '00:00:00'
    },
    isToday () {
      return this.localTime.format('YYYY-MM-DD') === this.$time().format('YYYY-MM-DD')
    },
    fromNowFormat () {
      const expectedTimeValue = this.isDateFormat ? this.localTime.set('hour', 23).set('minute', 59) : this.localTime
      return this.isDateFormat && this.isToday ? '今天' : expectedTimeValue.from()
    },
    timeFormat () {
      if (this.format) {
        return this.format
      }
      const presetFormat = {
        date: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm:ss'
      }
      return presetFormat[this.type]
    }
  }
}
</script>
