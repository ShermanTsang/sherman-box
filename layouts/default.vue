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

  .layout-toolbar {
    @media ($screen-md-min) {
      left: $sidebar-width;
      margin-left: $sidebar-width;
    }
  }
</style>

<template>
  <div id="app">
    <layout-sidebar class="layout-sidebar" />
    <layout-header class="layout-header" />
    <layout-toolbar class="layout-toolbar" />
    <layout-view>
      <layout-main class="layout-main">
        <nuxt />
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
    }
  },
  methods: {
  }
}
</script>
