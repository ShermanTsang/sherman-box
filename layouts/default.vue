<style lang="scss">
  .layout-main {
  }

  .layout-toolbar {
  }
</style>

<template>
  <div id="app">
    <LayoutHeader class="layout-header" />
    <LayoutView>
      <LayoutMain class="layout-main">
        <nuxt />
      </LayoutMain>
      <LayoutFooter />
    </LayoutView>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: {}
    }
  },
  watch: {
    $route (to, from) {
    }
  },
  methods: {
  }
}
</script>
