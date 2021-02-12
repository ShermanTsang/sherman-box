<style lang="scss">
$prefix: 'image-gallery';

  .#{$prefix} {
    z-index: $z-index-modal;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,.8);

    &__image {
      z-index: $z-index-modal;
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
        border: 2px solid #efefef;
        margin: 0 auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>

<template>
  <transition name="fade">
    <div v-if="imageUrl" class="image-gallery" @click="handleClick($event)">
      <div class="image-gallery__image">
        <Pic :url="imageUrl" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: this.url
    }
  },
  watch: {
    url (url) {
      this.imageUrl = url
      this.$emit('update:url', url)
    }
  },
  methods: {
    handleClick (event) {
      if (event.target.nodeName !== 'IMG') {
        this.imageUrl = null
        this.$emit('update:url', this.imageUrl)
      }
    }
  }
}
</script>
