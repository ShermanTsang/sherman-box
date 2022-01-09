import Vue from 'vue'

export default function ({ store, $config }) {
  function getConfig (key, returnType = 'value') {
    if (!key) {
      throw new Error('Please input key')
    }
    const configurationList = this.$store.getters.configurationList || []
    const configurationTarget = configurationList.find((item) => {
      return item.key === key || item.id === key
    })
    if (!configurationTarget) {
      return `{{ ${key} }}`
    }
    return returnType === 'object' ? configurationTarget : configurationTarget.value || ''
  }

  function getOssUrl (url, needProxy = false) {
    if (!url) {
      return ''
    }
    const isWithDomain = url.includes('http://') || url.includes('https://')
    const is3rdResource = !url.includes($config.serverHost)
    const resourceDomain = needProxy ? '/oss' : $config.ossBaseurl
    return isWithDomain
      ? (is3rdResource ? url : `${resourceDomain}/${url.replace(/^http(s)?:\/\/(.*?)\//, '')}`)
      : `${resourceDomain}/${url}`
  }

  function getStringCount (string) {
    if (!string) {
      return 0
    }
    try {
      const hasMany = string.includes(',')
      if (hasMany) {
        const tagArray = string.split(',')
        return tagArray.length
      }
      return 1
    } catch (e) {
      return 1
    }
  }

  function getImageAsset (key, returnType = 'value') {
    if (!key) {
      return '[ key is null ]'
    }
    const imageAssetList = this.$store.getters.imageAssetList || []
    const imageAssetTarget = imageAssetList.find((item) => {
      return item.key === key || item.id === key
    })
    if (!imageAssetTarget) {
      return `[ imageAsset ${key} not found ]`
    }
    return returnType === 'object' ? imageAssetTarget : this.$getOssUrl(imageAssetTarget.url) || ''
  }

  function getFileAsset (key, returnType = 'value') {
    if (!key) {
      return '[ key is null ]'
    }
    const fileAssetList = this.$store.getters.fileAssetList || []
    const fileAssetTarget = fileAssetList.find((item) => {
      return item.key === key || item.id === key
    })
    if (!fileAssetTarget) {
      return `[ fileAsset ${key} not found ]`
    }
    return returnType === 'object' ? fileAssetTarget : this.$getOssUrl(fileAssetTarget.url) || ''
  }

  function getSeoInfo (type, value) {
    const seoConfig = {
      description: {
        value: `${value} - ${$config.siteDescription}`
      },
      keywords: {
        value: `${value} - ${$config.siteKeywords}`
      }
    }
    return seoConfig[type].value || ''
  }

  function getModuleConfig (module) {
    const mainConfigList = store.getters.moduleList || []
    const configList = {
      timeline: {
        name: '时间轴', dateField: 'date'
      },
      day: {
        name: '日迹', dateField: 'date'
      },
      blog: {
        name: '博文', dateField: 'datetime'
      },
      movie: {
        name: '观影', dateField: 'datetime'
      },
      project: {
        name: '项目', dateField: 'datetime_start'
      },
      plan: {
        name: '计划', dateField: 'datetime_start'
      },
      idea: {
        name: '想法', dateField: 'datetime'
      },
      mailbox: {
        name: '邮局', dateField: 'datetime'
      }
    }
    if (mainConfigList && mainConfigList.length > 0) {
      mainConfigList.forEach((item) => {
        if (configList[item.url]) {
          configList[item.url] = { ...configList[item.url], ...item }
        }
      })
    }
    return module ? configList[module] : configList
  }

  function checkFormValidate (validateList = {}) {
    const validateValueList = Object.values(validateList) || {}
    const falseItem = validateValueList.find(item => item === false)
    return !!(falseItem || falseItem === undefined)
  }

  function fillStateByLocalStorage (actionKey, cacheKey, valueType, defaultValue) {
    if (process.client) {
      const localCache = localStorage.getItem(`ShareManBox~${cacheKey}`)
      let finalValue = null
      if (!localCache) {
        finalValue = defaultValue
      }
      if (valueType === 'number') {
        finalValue = Number.parseInt(localCache) || defaultValue
      }
      if (valueType === 'object') {
        finalValue = JSON.parse(localCache) || defaultValue
      }
      if (valueType === 'string') {
        finalValue = JSON.parse(localCache) || defaultValue
      }
      this.$store.commit(actionKey, finalValue)
    }
  }

  function constructTree (originData, idFieldName = 'id', parentIdFieldName = 'parent_id', uselessFieldNameArray = []) {
    const data = JSON.parse(JSON.stringify(originData))

    data.forEach(function (item) {
      // delete useless field
      ['children', ...uselessFieldNameArray].forEach((fieldName) => {
        item[fieldName] && (delete item[fieldName])
      })
    })

    const itemMapFromId = {}
    data.forEach(function (item) {
      itemMapFromId[item[idFieldName]] = item
    })

    const dataTree = []
    data.forEach((item) => {
      const parent = itemMapFromId[item[parentIdFieldName]]
      parent ? ((parent.children || (parent.children = []))).push(item) : dataTree.push(item)
    })

    return dataTree
  }

  Vue.prototype.$getConfig = getConfig
  Vue.prototype.$getFileAsset = getFileAsset
  Vue.prototype.$getImageAsset = getImageAsset
  Vue.prototype.$getOssUrl = getOssUrl
  Vue.prototype.$getStringCount = getStringCount
  Vue.prototype.$getSeoInfo = getSeoInfo
  Vue.prototype.$getModuleConfig = getModuleConfig
  Vue.prototype.$checkFormValidate = checkFormValidate
  Vue.prototype.$fillStateByLocalStorage = fillStateByLocalStorage
  Vue.prototype.$constructTree = constructTree
}
