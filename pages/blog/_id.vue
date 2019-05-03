<style lang="scss">
</style>

<template>
  <main>
    blogShowPage
  </main>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>
