<style lang="scss">
$prefix: 'infoBox';

.#{$prefix} {
  position: relative;
  vertical-align: top;
  display: inline-block;
  transition: all .2s ease-in-out;
  border: 1px dashed #efefef;
  cursor: pointer;
  overflow: hidden;
  margin: 4px;
  @media ($screen-sm-max) {
    width: 100% !important;
    height: 160px !important;
  }

  &__icon {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 12px;

    i {
      transition: all .2s ease-in-out;
    }
  }

  &__image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: $z-index-card-background;
    background-position: center;
    background-size: cover;
    opacity: .5;
    filter: blur(2px);
    transition: all .4s ease-in-out;
  }

  &__main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px;
    z-index: $z-index-card-content;

    &__description {
      color: #999;
      font-size: .8rem;
      letter-spacing: 1px;
    }

    &__description--withImage {
      display: inline-block;
      padding: 4px;
      color: #333;
      border-radius: 2px;
      background-color: rgba(255, 255, 255, .8);
    }

    &__content {
      margin-top: 16px;
    }

    &__content--withImage {
      color: #fff;
      text-shadow: 1px 1px 4px #000;
    }

  }

  &:hover {
    box-shadow: 0 0 12px 2px rgba(177, 177, 177, .1) inset;

    .#{$prefix}__icon {
      i {
        transform: scale(1.1);
      }
    }

    .#{$prefix}__image {
      transform: scale(1.1);
      filter: blur(0);
      opacity: .8;
    }

  }

}
</style>

<template>
  <div class="infoBox" :style="style.main" @click="clickItem">
    <div v-if="icon" class="infoBox__icon" :style="{lineHeight: iconSize}">
      <Icon :name="icon" size="24px" color="#ddd" />
    </div>
    <div class="infoBox__image" :style="style.image"></div>
    <div class="infoBox__main">
      <div
        v-if="$slots.description || description"
        class="infoBox__main__description"
        :class="{'infoBox__main__description--withImage': image}"
      >
        {{ description }}
        <slot name="description" />
      </div>
      <div
        v-if="$slots.default && $slots.default[0]"
        class="infoBox__main__content"
        :class="{'infoBox__main__content--withImage': image}"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCell',
  props: {
    icon: {
      type: String,
      default: undefined
    },
    iconSize: {
      type: String,
      default: '24px'
    },
    description: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: '180px'
    },
    path: {
      type: String,
      default: undefined
    },
    image: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {}
  },
  computed: {
    style () {
      const main = {
        height: this.size,
        width: this.size,
        cursor: this.path ? 'pointer' : 'default'
      }
      const image = {}
      if (this.image) {
        image['background-image'] = `url(${this.$getOssUrl(this.image)})`
      }
      return { main, image }
    }
  },
  methods: {
    clickItem () {
      const path = this.path
      if (path) {
        this.$router.push(path)
      }
    }
  }
}
</script>
