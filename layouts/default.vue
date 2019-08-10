<style lang="scss">
  .layout-sidebar {
    display: none;
    @media ($screen-sm) {
      display: block;
    }
  }

  .layout-header {
    display: block;
    @media ($screen-sm) {
      display: none;
    }
  }
</style>

<template>
  <div id="app">
    <layout-sidebar class="layout-sidebar" />
    <layout-header class="layout-header" />
    <layout-view>
      <layout-main>
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
  mounted() {
    if (process.browser) {
    }
  },
  methods: {}
}
</script>
