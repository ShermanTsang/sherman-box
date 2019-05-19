import Vue from 'vue'

export default function () {
  function getApiUrl(url) {
    const config = this.$configList('api')
    return `${config['api.protocol']}://${config['api.domain']}/${config['api.version']}/${url}`
  }

  Vue.prototype.$getApiUrl = getApiUrl
}
