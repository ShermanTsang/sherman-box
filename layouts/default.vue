<style lang="scss">
  .layout-sidebar {
    display: none;
    @media ($screen-md-min) {
      display: block;
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
    <LayoutHeader class="layout-header" />
    <LayoutSidebar class="layout-sidebar" />
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
