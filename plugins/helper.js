import Vue from 'vue'
import Gravatar from 'gravatar-url'

export default function () {
  function getApiUrl(url) {
    const config = this.$configList('api')
    return `${config['api.protocol']}://${config['api.domain']}/${config['api.version']}/${url}`
  }

  function getImageUrl(url) {
    const isWithDomain = url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    const ossUrl = this.$config('oss.domain.https')
    return isWithDomain ? url : `https://${ossUrl}/${url}`
  }

  function getAvatarUrl(type, sign) {
    switch (type) {
      case 'email':
        const originUrl = Gravatar(sign, { size: 200 })
        return originUrl.replace('gravatar.com', 'cn.gravatar.com')
      case 'qq':
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=${sign}&spec=100`
      default:
        return ''
    }
  }

  Vue.prototype.$getApiUrl = getApiUrl
  Vue.prototype.$getImageUrl = getImageUrl
  Vue.prototype.$getAvatarUrl = getAvatarUrl
}
