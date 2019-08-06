<style lang="scss">
  .moment {
    transition: all .3s ease-in-out;
    color: unset !important;

    &:hover {
      text-decoration: underline;
      text-decoration-color: inherit;
    }
  }
</style>

<template>
  <nuxt-link v-if="timeValue" :to="{path:`/day/${timeValue.format('YYYY-MM-DD')}`}" class="moment">
    {{ timeValue.format(format) }}
    <small v-if="fromNow">{{ timeValue.fromNow() }}</small>
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
    }
  },
  computed: {
    timeValue() {
      return this.$time(this.time) || undefined
    }
  }
}
</script>
