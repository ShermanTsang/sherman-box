<style lang="scss">
  .avatar {
    display: inline-block;
    img {
      box-shadow: 0 0 4px rgba(177,177,177,.5);
      object-fit: cover;
      background-color: #fff;
      border-radius: 50%;
    }
  }
</style>

<template>
  <div class="avatar">
    <img :src="avatarUrl" :style="style">
  </div>
</template>

<script>
import Gravatar from 'gravatar-url'
import defaultEmail from '@/assets/image/defaultImage.png'

export default {
  name: 'Avatar',
  props: {
    size: {
      type: String,
      default: '48px'
    },
    sign: {
      type: String,
      default: ''
    }
  },
  computed: {
    avatarUrl() {
      const sign = this.sign
      const isEmail = sign.indexOf('@') !== -1
      const isQQ = /^[1-9][0-9]{4,9}$/gim.test(sign)
      const isWechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(sign)
      if (isEmail) {
        const originUrl = Gravatar(sign, { size: 200 })
        return originUrl.replace('gravatar.com', 'cn.gravatar.com')
      }
      if (isQQ) {
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=${sign}&spec=100`
      }
      if (isWechat) {
        return defaultEmail
      }
      return defaultEmail
    },
    style() {
      return {
        height: this.size,
        width: this.size
      }
    }
  }
}
</script>
