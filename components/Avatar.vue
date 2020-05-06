<style lang="scss">
  .avatar {
    display: inline-block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #fff;

      &:hover {
        box-shadow: 0 0 4px rgba(177, 177, 177, .5);
      }
    }
  }
</style>

<template>
  <div class="avatar" :style="style" @click="$emit(click)">
    <img :src="avatarUrl">
  </div>
</template>

<script>
import Gravatar from 'gravatar-url'
import defaultEmail from '@/assets/image/defaultAvatar.png'

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
    avatarUrl () {
      if (this.sign) {
        const sign = this.sign
        const isEmail = sign.includes('@')
        const isQQ = /^[1-9][0-9]{4,9}$/gim.test(sign)
        // const isWechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(sign)
        if (isEmail) {
          const originUrl = Gravatar(sign, { size: 200 })
          return originUrl.replace('gravatar.com', 'cn.gravatar.com')
        }
        if (isQQ) {
          return `http://q2.qlogo.cn/headimg_dl?dst_uin=${sign}&spec=100`
        }
      }
      return defaultEmail
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
