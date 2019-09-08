<style lang="scss">
  .logo {
    cursor: pointer;
    font-size: 1.2rem;
  }
</style>

<template>
  <div class="logo">
    <img :src="image" alt="logo" :style="style" @click="$router.push('/')">
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'icon'].includes(value)
      }
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    image() {
      return this.type === 'text' ? this.$getImageAsset('logo') : '/favicon.ico'
    },
    style() {
      return {
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>
