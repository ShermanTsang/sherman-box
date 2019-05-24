<style lang="scss">
  .comment {
  }
</style>

<template>
  <div class="blocker" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Blocker',
  props: {
    commentCollection: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>
