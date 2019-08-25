<style lang="scss">
  .message {
    position: fixed;
    right: 30px;
    top: 10%;
    padding: 10px;
    border-radius: 0 0 5px 5px;
    z-index: 998;
    box-shadow: 0 0 6px rgba(177,177,177,.2);
    background-color: #fff;
    color: #666;
    font-size: .95rem;
    letter-spacing: 1px;

    &--info {
      color: #fff;
      @include gradient-background;
    }

    &--success {
      border-bottom: 5px solid green;
    }

    &--warning {
      border-bottom: 5px solid orange;
    }

    &--error {
      border-bottom: 5px solid red;
    }

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>

<template>
  <transition name="fade">
    <div v-show="isShow" class="message" :class="`message--${type}`">
      <Icon v-if="icon" :name="icon"></Icon>
      <span class="text">{{ text }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      text: '',
      icon: 'info',
      type: 'info',
      isShow: false
    }
  },
  computed: {
    style() {
      return {
      }
    }
  },
  methods: {}
}
</script>
