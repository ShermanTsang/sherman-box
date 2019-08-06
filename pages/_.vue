<style lang="scss">
</style>

<template>
  <layout-container>
    404
  </layout-container>
</template>

<script>
export default {
  layout: 'default',
  asyncData({ params }) {
    return {}
  },
  mounted() {
    this.checkPathMatch()
  },
  methods: {
    checkPathMatch() {
      const path = this.$route.params.pathMatch
      const isDate = /^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(path)
      if (isDate) {
        const date = this.$time(path)
        this.$router.push(`/day/${date.format('YYYY-MM-DD')}`)
      }
    }
  }
}
</script>
