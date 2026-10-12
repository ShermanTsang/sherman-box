<style lang="scss">
  .main {
    flex: 1;
    overflow: hidden;
    margin-top: $header-height;
    background-color: #fff;
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

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

const __legacyOptions = {
  computed: {
    hasNavigator () { return this.$store.getters.hasNavigator }
  }
}

defineOptions({ name: "LayoutMain" })

const { hasNavigator } = useLegacyOptions(__legacyOptions, {})
</script>
