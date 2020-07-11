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
        <transition name="fade">
          <nuxt />
        </transition>
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
  methods: {
  }
}
</script>
