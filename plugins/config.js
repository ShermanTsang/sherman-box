import Vue from 'vue'

export default function ({ $axios, redirect }) {
  const config = {
    'api.protocol': 'https',
    'api.version': 'v1',
    'api.domain': 'api.share-man.com'
  }

  function getConfigItem(key) {
    return key ? config[key] : `[!${key}]`
  }

  function getConfigList(keyword) {
    if (!keyword) {
      return config
    } else {
      const filterConfigKey = Object.keys(config).filter((item) => {
        return item.indexOf(keyword) !== -1
      })
      const filterConfigObject = {}
      filterConfigKey.forEach((item) => {
        filterConfigObject[item] = config[item]
      })
      return filterConfigObject
    }
  }

  Vue.prototype.$config = getConfigItem
  Vue.prototype.$configList = getConfigList
}
