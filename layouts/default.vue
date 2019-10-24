<style lang="scss">
  .layout-sidebar {
    display: none;
    @media ($screen-md-min) {
      display: block;
    }
  }

  .layout-header {
    display: block;
    @media ($screen-md-min) {
      display: none;
    }
  }

  .layout-main {
    @media ($screen-md-min) {
      margin-left: $sidebar-width;
    }
  }
</style>

<template>
  <div id="app">
    <layout-sidebar class="layout-sidebar" />
    <layout-header class="layout-header" />
    <layout-view>
      <layout-main class="layout-main">
        <transition name="fade">
          <nuxt />
        </transition>
      </layout-main>
      <layout-footer />
    </layout-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: {}
    }
  },
  watch: {
    $route: function (to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  methods: {}
}
</script>
