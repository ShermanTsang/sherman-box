<style lang="scss">
  .pic {
    position: relative;
    display: inline-block;
    overflow: hidden;

    img {
      display:block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #fff;
      overflow: hidden;
    }

    &__text {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 8px 16px;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-image: linear-gradient(126deg, rgba(0, 0, 0, .4), transparent);
    }

  }
</style>

<template>
  <div v-if="imgUrl" class="pic" :style="imgStyle" @click="handleClick()">
    <img v-lazy="imgUrl">
    <div v-if="$slots.default && $slots.default[0]" class="pic__text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pic',
  props: {
    url: {
      type: String,
      default: null
    },
    asset: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    },
    radius: {
      type: String,
      default: '0'
    },
    width: {
      type: [String, undefined],
      default: undefined
    },
    height: {
      type: [String, undefined],
      default: undefined
    },
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    },
    canPreview: {
      type: [Boolean, undefined],
      default: undefined
    },
    link: {
      type: [String, undefined],
      default: undefined
    }
  },
  computed: {
    imgStyle () {
      const styles = {
        'border-radius': this.radius
      }
      if (this.height) {
        styles.height = this.height
      }
      if (this.width) {
        styles.width = this.width
      }
      if (this.canPreview || this.link) {
        styles.cursor = 'pointer'
      }
      return {
        ...styles,
        ...this.styles
      }
    },
    imgUrl () {
      if (this.url) {
        return this.$getOssUrl(this.url)
      }
      if (this.asset) {
        return this.$getImageAsset(this.asset)
      }
      if (this.path) {
        try {
          return require('../assets/image/' + this.path)
        } catch (e) {
          console.log('Image resource \'' + this.path + '\' is not found !')
          return require('../assets/image/imageError.png')
        }
      }
      return undefined
    }
  },
  methods: {
    handleClick () {
      if (this.link) {
        this.$router.push(this.link)
      }
      if (this.canPreview) {
        window.open(this.imgUrl, '_blank')
      }
      this.$emit('click')
    }
  }
}
</script>
