<style lang="scss">
  .message {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 16px;
    z-index: $z-index-message;
    color: #fff;
    font-size: .95rem;
    letter-spacing: 1px;
    border-radius: 20px;

    &--info {
      background-color: $theme-color;
      box-shadow: 6px 10px 30px rgba(10, 132, 234, 0.5);
    }

    &--success {
      background-color: green;
      box-shadow: 6px 10px 30px rgba(28, 234, 37, 0.5);
    }

    &--warning {
      background-color: orange;
      box-shadow: 6px 10px 30px rgba(234, 200, 7, 0.5);
    }

    &--error {
      background-color: red;
      box-shadow: 6px 10px 30px rgba(234, 117, 28, 0.5);
    }

  }
</style>

<template>
  <transition name="fade">
    <div v-show="isShow" :class="`message--${type}`" class="message">
      <Icon v-if="icon" :name="icon" />
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
      return {}
    }
  },
  methods: {
  }
}
</script>
