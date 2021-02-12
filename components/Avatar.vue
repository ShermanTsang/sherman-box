<style lang="scss">
$prefix: 'avatar';

  .#{$prefix} {
    display: inline-block;
    transition: all .2s ease-in;

    img {
      border-radius: 50%;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #fff;
      box-shadow: 0 0 4px rgba(177, 177, 177, .2);
      border: 1px solid #eee;

      &:hover {
        box-shadow: 0 0 8px rgba(177, 177, 177, .5);
      }

    }
  }
</style>

<template>
  <div class="avatar" :style="style" @click="$emit('click')">
    <Pic v-if="value" :url="avatarUrl" />
    <Pic v-else path="defaultAvatar.png" />
  </div>
</template>

<script>
import Gravatar from 'gravatar-url'

export default {
  name: 'Avatar',
  props: {
    size: {
      type: String,
      default: '48px'
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    avatarUrl () {
      if (this.value) {
        const value = this.value
        const isEmail = value.includes('@')
        const isQQ = /^[1-9][0-9]{4,9}$/gim.test(value)
        // const isWechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(value)
        if (isEmail) {
          const originUrl = Gravatar(value, { size: 200 })
          return originUrl.replace('gravatar.com', 'cn.gravatar.com')
        }
        if (isQQ) {
          return `http://q2.qlogo.cn/headimg_dl?dst_uin=${value}&spec=100`
        }
      }
      return null
    },
    style () {
      return {
        height: this.size,
        width: this.size
      }
    }
  }
}
</script>
