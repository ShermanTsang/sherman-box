import Vue from 'vue'
import Gravatar from 'gravatar-url'

export default function () {
  function getApiUrl(url) {
    const config = this.$configList('api')
    return `${config['api.protocol']}://${config['api.domain']}/${config['api.version']}/${url}`
  }

  function getOssUrl(url) {
    if (!url) {
      return ''
    }
    const isWithDomain = url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    const is3rdResource = url.indexOf('cdn.share-man.com') === -1 && url.indexOf('sharemancdn.ochase.com') === -1
    return isWithDomain
      ? (is3rdResource ? url : `/oss/${url.replace(/^http(s)?:\/\/(.*?)\//, '')}`)
      : `/oss/${url}`
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

  function getStringCount(string) {
    if (!string) {
      return 0
    }
    try {
      const hasMany = string.indexOf(',') !== -1
      if (hasMany) {
        const tagArray = string.split(',')
        return tagArray.length
      }
      return 1
    } catch (e) {
      return 1
    }
  }

  Vue.prototype.$getApiUrl = getApiUrl
  Vue.prototype.$getOssUrl = getOssUrl
  Vue.prototype.$getAvatarUrl = getAvatarUrl
  Vue.prototype.$getStringCount = getStringCount
}
