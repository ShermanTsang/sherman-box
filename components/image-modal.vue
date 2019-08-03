<style lang="scss">
  .image-box {
    z-index: 996;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    &__overlay {
      z-index: 998;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: .87;
      transition-timing-function: cubic-bezier(.22,.61,.36,1);
      background: rgba(0,0,0,.6);
    }

    &__image {
      z-index: 999;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding: 44px 0;

      img {
        margin: 0 auto;
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0 0 30px rgba(0,0,0,.2);
      }
    }
  }
</style>

<template>
  <div v-if="imageUrl" v-transfer-dom class="image-box" @click="handleClick($event)">
    <div class="image-box__overlay"></div>
    <div class="image-box__image">
      <img :src="$getOssUrl(imageUrl)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageModal',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: this.url
    }
  },
  watch: {
    url(url) {
      this.imageUrl = url
      this.$emit('update:url', url)
    }
  },
  mounted() {
  },
  methods: {
    handleClick(event) {
      if (event.target.nodeName !== 'IMG') {
        this.imageUrl = null
        this.$emit('update:url', this.imageUrl)
      }
    }
  }
}
</script>
