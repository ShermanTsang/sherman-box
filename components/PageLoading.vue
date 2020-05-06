<style lang="scss">
  .page-loading {
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

<script>
export default {
  name: 'PageLoading',
  props: {},
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
</script>
