<style lang="scss">
$prefix: 'pic';

.#{$prefix} {
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
  <div v-if="imgUrl" ref="pic" class="pic" :style="imgStyle" @click="handleClick()">
    <img v-if="lazyLoad" v-lazy="imgUrl">
    <img v-else :src="imgUrl">
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
    autoFill: {
      type: Boolean,
      default: undefined
    },
    lazyLoad: {
      type: Boolean,
      default: true
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
    },
    needProxy: {
      type: Boolean,
      default: false
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
      if (this.path) {
        try {
          return require('../assets/image/' + this.path)
        } catch (e) {
          console.log('Image resource \'' + this.path + '\' is not found !')
          return require('../assets/image/imageError.png')
        }
      }
      if (this.url) {
        const isExternalUrl = this.url.startsWith('http') || this.url.startsWith('data:')
        return isExternalUrl ? this.url : this.$getOssUrl(this.url, this.needProxy)
      }
      if (this.asset) {
        return this.$getImageAsset(this.asset)
      }
      return undefined
    }
  },
  mounted () {
    this.autoFill && this.fillParentNode()
  },
  methods: {
    fillParentNode () {
      const parentNode = this.$refs.pic.parentNode
      if (parentNode) {
        const parentNodeStyle = window.getComputedStyle
          ? window.getComputedStyle(parentNode, '')
          : parentNode.currentStyle
        const { height, width } = parentNodeStyle
        height && this.$refs.pic.style.setProperty('height', height)
        width && this.$refs.pic.style.setProperty('width', width)
      }
    },
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
