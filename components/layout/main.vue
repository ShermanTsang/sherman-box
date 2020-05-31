<style lang="scss">
  .main {
    flex: 1;
    overflow: hidden;
    margin-top: $header-height;
  }

  .main--withNavigator {
    margin-top: $header-height-withNav;
  }

</style>

<template>
  <main class="main" :class="{'main--withNavigator': hasNavigator}">
    <slot />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutMain',
  computed: {
    ...mapGetters(['hasNavigator'])
  }
}
</script>
