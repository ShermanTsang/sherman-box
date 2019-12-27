<style lang="scss">
  .page-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-overlay;
  }
</style>

<template>
  <div v-if="loading" class="page-loading">
  </div>
</template>

<script>
export default {
  name: 'PageLoading',
  props: {
  },
  data: () => ({
    loading: false
  }),
  computed: {
  },
  mounted() {
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>
