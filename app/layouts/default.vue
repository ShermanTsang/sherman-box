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
        <slot />
      </LayoutMain>
      <LayoutFooter />
    </LayoutView>
  </div>
</template>

