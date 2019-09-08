<style lang="scss">
  .message {
    position: fixed;
    right: 30px;
    top: 5%;
    padding: 12px 16px;
    z-index: 1006;
    background-color: #fff;
    color: #666;
    font-size: .95rem;
    letter-spacing: 1px;
    box-shadow: 10px 20px 30px rgba(0,0,0,.2);

    &--info {
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
