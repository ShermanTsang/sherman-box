<style lang="scss">
$prefix: 'page-loading';

.#{$prefix} {
    position: fixed;
    left: 50%;
    bottom: 60px;
    z-index: $z-index-overlay;
    transform: translateX(-50%);

    &__tip {
      color: #fff;
      border-radius: 20px;
      padding: 8px 16px;
      background-color: $theme-color;
      box-shadow: 6px 10px 40px rgba(10, 132, 234, 0.5);
    }

  }
</style>

<template>
  <transition name="fade">
    <div v-if="loading" class="page-loading">
      <div class="page-loading__tip">
        <Icon name="spinner" rotate />
        Loading
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {
  data: () => ({
    loading: false
  }),
  computed: {},
  mounted () {
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}

defineOptions({ name: "PageLoading" })

const legacyProps = defineProps({})

const { finish, loading, start } = useLegacyOptions(__legacyOptions, legacyProps)
</script>
