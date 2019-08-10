import Vue from 'vue'
import Gravatar from 'gravatar-url'
import config from '../config'

export default function ({ store }) {
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

  function getApiUrl(url) {
    const config = this.$configList('api')
    return `${config['api.protocol']}://${config['api.domain']}/${config['api.version']}/${url}`
  }

  function getOssUrl(url, isProxy = false) {
    if (!url) {
      return ''
    }
    const isWithDomain = url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    const is3rdResource = url.indexOf('cdn.share-man.com') === -1 && url.indexOf('sharemancdn.ochase.com') === -1
    const resourceDomain = isProxy ? '/oss/' : `https://${config['oss.domain.https']}`
    return isWithDomain
      ? (is3rdResource ? url : `${resourceDomain}/${url.replace(/^http(s)?:\/\/(.*?)\//, '')}`)
      : `${resourceDomain}/${url}`
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

  function getConfig(key, returnType = 'value') {
    if (!key) {
      return '[ key is null ]'
    }
    const configurationCollection = this.$store.getters.configurationCollection || []
    const configurationTarget = configurationCollection.find((item) => {
      return item.name === key || item.id === key
    })
    if (!configurationTarget) {
      return `[ configuration ${key} not found ]`
    }
    return returnType === 'object' ? configurationTarget : configurationTarget.value || ''
  }

  function getImageAsset(key, returnType = 'value') {
    if (!key) {
      return '[ key is null ]'
    }
    const imageAssetCollection = this.$store.getters.imageAssetCollection || []
    const imageAssetTarget = imageAssetCollection.find((item) => {
      return item.key === key || item.id === key
    })
    if (!imageAssetTarget) {
      return `[ imageAsset ${key} not found ]`
    }
    return returnType === 'object' ? imageAssetTarget : this.$getOssUrl(imageAssetTarget.url) || ''
  }

  function getFileAsset(key, returnType = 'value') {
    if (!key) {
      return '[ key is null ]'
    }
    const fileAssetCollection = this.$store.getters.fileAssetCollection || []
    const fileAssetTarget = fileAssetCollection.find((item) => {
      return item.key === key || item.id === key
    })
    if (!fileAssetTarget) {
      return `[ fileAsset ${key} not found ]`
    }
    return returnType === 'object' ? fileAssetTarget : this.$getOssUrl(fileAssetTarget.url) || ''
  }

  function getSeoInfo(type, value) {
    const seoConfig = {
      description: {
        value: `${value} - ${config['site.description']}`
      },
      keywords: {
        value: `${value} - ${config['site.keywords']}`
      }
    }
    return seoConfig[type].value || ''
  }

  function getModuleConfig(module) {
    const mainConfigList = store.getters.moduleCollection || []
    const configList = {
      day: {
        name: '日迹', date: 'date'
      },
      blog: {
        name: '博文', date: 'datetime'
      },
      movie: {
        name: '观影', date: 'datetime'
      },
      project: {
        name: '项目', date: 'datetime_start'
      },
      plan: {
        name: '计划', date: 'datetime'
      },
      idea: {
        name: '想法', date: 'datetime'
      },
      mailbox: {
        name: '邮局', date: 'datetime'
      }
    }
    if (mainConfigList && mainConfigList.length > 0) {
      mainConfigList.forEach((item) => {
        if (configList[item.url]) {
          configList[item.url] = Object.assign(configList[item.url], item)
        }
      })
    }
    return module ? configList[module] : configList
  }

  Vue.prototype.$config = getConfigItem
  Vue.prototype.$configList = getConfigList
  Vue.prototype.$getConfig = getConfig
  Vue.prototype.$getFileAsset = getFileAsset
  Vue.prototype.$getImageAsset = getImageAsset
  Vue.prototype.$getApiUrl = getApiUrl
  Vue.prototype.$getOssUrl = getOssUrl
  Vue.prototype.$getAvatarUrl = getAvatarUrl
  Vue.prototype.$getStringCount = getStringCount
  Vue.prototype.$getSeoInfo = getSeoInfo
  Vue.prototype.$getModuleConfig = getModuleConfig
}
