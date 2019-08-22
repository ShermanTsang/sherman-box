<style lang="scss">
  .form {

  }
</style>

<template>
  <div class="form" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
  },
  data() {
    return {
      data: {
        value: ''
      }
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  methods: {
  }
}
</script>
