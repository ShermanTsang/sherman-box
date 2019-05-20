<style lang="scss">
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
</style>

<template>
  <div id="app">
    <layout-header />
    <layout-main>
      <nuxt />
    </layout-main>
    <layout-footer />
  </div>
</template>
