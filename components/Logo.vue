<style lang="scss">
  .logo {
    cursor: pointer;
  }
</style>

<template>
  <div class="logo" @click="$router.push('/')">
    <template v-if="type === 'image'">
      <img :src="$getImageAsset('logo')" :style="style" alt="logo">
    </template>
    <template v-if="type === 'text'">
      <CustomFont size="1.4rem" color="#666">
        {{ $getConfig('site.name') }}
      </CustomFont>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return ['text', 'icon', 'image'].includes(value)
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
    style () {
      return {
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>
