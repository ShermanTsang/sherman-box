import Vue from 'vue'

export default function ({ $axios, redirect }) {
  const config = {
    'api.protocol': 'https',
    'api.version': 'v1',
    'api.domain': 'api.share-man.com',
    'oss.domain.default': '7mnmjl.com1.z0.glb.clouddn.com',
    'oss.domain.custom': 'sharemancdn.ochase.com',
    'oss.domain.https': 'cdn.share-man.com',
    'geetest.id': 'b2efc5d05666f74e38b1f9eebaf028c4',
    'geetest.key': '5d4254f168393ec1a91c17c680c23868'
  }

  Vue.prototype.$config = getConfigItem
  Vue.prototype.$configList = getConfigList

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
}
