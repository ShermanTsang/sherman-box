<style lang="scss">
</style>

<template>
  <section class="container">
    <div>
      <logo />
      <div class="links">
        <nuxt-link to="/blog">
          Blog
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'default',
  asyncData(context) {
    return {

    }
  }
}
</script>
