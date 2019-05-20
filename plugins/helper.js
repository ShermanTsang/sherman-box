import Vue from 'vue'

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

  Vue.prototype.$getApiUrl = getApiUrl
  Vue.prototype.$getImageUrl = getImageUrl
}
