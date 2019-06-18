<style lang="scss">
  .clock {
    transition: all .3s ease-in-out;
    &:hover {
      text-decoration: underline;
      text-decoration-color: inherit;
    }
  }
</style>

<template>
  <nuxt-link :to="`/day/${$time(timeValue).format('YYYY-MM-DD')}`" class="clock">
    {{ $time(timeValue).format(format) }}
    <span v-if="fromNow">{{ $time(timeValue).fromNow() }}</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Clock',
  props: {
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    fromNow: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      timeValue: this.$slots.default[0].text || ''
    }
  }
}
</script>
