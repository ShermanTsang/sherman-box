<style lang="scss">
  .modal {
    z-index: $z-index-modal;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &__overlay {
      position: fixed;
      z-index: $z-index-overlay;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255,.8);
      background-image: url(data:image/png;base64,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);
    }

    &__container {
      position: relative;
      z-index: $z-index-modal;
      height: auto;
      overflow: hidden;
      max-width: 96%;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0 0 20px 8px rgba(177,177,177, .4);

      &__header {
        font-size: 1.15rem;
        letter-spacing: 2px;
        color: #666;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        box-shadow: 0 6px 6px rgba(177,177,177,.1);

        ::v-deep i {
          font-size: 20px;
        }

        &__name {
          cursor: default;
          display: inline-block;
        }

        &__close {
          color: #ddd;
          transition: all .2s ease-in-out;
          cursor: pointer;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      &__content {
        padding: 24px;
        max-height: 80vh;
        overflow: auto;

        @media ($screen-md-max) {
          width: 100%;
          order: 2;
          padding: 16px 10px;
        }
      }

      &__footer {
        width: 100%;
      }

    }

  }
</style>

<template>
  <div v-if="showModal" class="modal">
    <div class="modal__overlay" @click="toggleModalStatus()"></div>
    <div class="modal__container" :style="containerStyle">
      <div class="modal__container__header">
        <div class="modal__container__header__name">
          <Icon v-if="icon" :name="icon" />
          {{ title }}
        </div>
        <span class="modal__container__header__close" @click="toggleModalStatus()">
          <Icon name="close" />
        </span>
      </div>
      <div class="modal__container__content">
        <slot />
      </div>
      <div v-if="$slots.footer" class="modal__container__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  model: {
    prop: 'showModal',
    event: 'toggleModalStatus'
  },
  props: {
    width: {
      type: String,
      default: '90%'
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showModal: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    containerStyle () {
      return {
        width: this.width
      }
    }
  },
  watch: {
    showModal (value) {
      this.lockScroll && this.setScreenScrolling(value ? 'hidden' : 'auto')
    }
  },
  destroyed () {
    this.lockScroll && this.setScreenScrolling('auto')
  },
  methods: {
    toggleModalStatus () {
      this.$emit('toggleModalStatus', !this.showModal)
      this.$emit(this.showModal ? 'onOpen' : 'onClose')
    },
    setScreenScrolling (attr) {
      document.body.style.setProperty('overflow', attr)
    }
  }
}
</script>
