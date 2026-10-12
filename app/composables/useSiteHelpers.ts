import { useAppStore } from '~/stores/app'

const moduleDefaults: Record<string, any> = {
  timeline: { name: '时间轴', dateField: 'date' },
  day: { name: '日迹', dateField: 'date' },
  blog: { name: '博文', dateField: 'datetime' },
  movie: { name: '观影', dateField: 'datetime' },
  project: { name: '项目', dateField: 'datetime_start' },
  plan: { name: '计划', dateField: 'datetime_start' },
  idea: { name: '想法', dateField: 'datetime' },
  mailbox: { name: '邮局', dateField: 'datetime' },
  word: { name: '话语', dateField: 'date' },
  monument: { name: '纪念碑', dateField: 'date' }
}

export function useSiteHelpers () {
  const store = useAppStore()
  const config = useRuntimeConfig().public

  function getConfig (key: string, returnType = 'value') {
    if (!key) throw new Error('Please input key')
    const target = store.configurationList.find(item => item.key === key || item.id === key)
    if (!target) return `{{ ${key} }}`
    return returnType === 'object' ? target : target.value || ''
  }

  function getOssUrl (url: string, needProxy = false) {
    if (!url) return ''
    const isWithDomain = url.includes('http://') || url.includes('https://')
    const isThirdParty = !url.includes(String(config.serverHost || ''))
    const resourceDomain = needProxy ? '/oss' : config.ossBaseurl
    return isWithDomain
      ? (isThirdParty ? url : `${resourceDomain}/${url.replace(/^http(s)?:\/\/(.*?)\//, '')}`)
      : `${resourceDomain}/${url}`
  }

  function getStringCount (value: string) {
    if (!value) return 0
    try { return value.includes(',') ? value.split(',').length : 1 } catch { return 1 }
  }

  function getAsset (list: any[], type: string, key: string, returnType = 'value') {
    if (!key) return `[ ${type} key is null ]`
    const target = list.find(item => item.key === key || item.id === key)
    if (!target) return `[ ${type} ${key} not found ]`
    return returnType === 'object' ? target : getOssUrl(target.url) || ''
  }

  function getImageAsset (key: string, returnType = 'value') { return getAsset(store.imageAssetList, 'imageAsset', key, returnType) }
  function getFileAsset (key: string, returnType = 'value') { return getAsset(store.fileAssetList, 'fileAsset', key, returnType) }

  function getSeoInfo (type: 'description' | 'keywords', value: string) {
    const suffix = type === 'description' ? config.siteDescription : config.siteKeywords
    return `${value} - ${suffix || ''}`
  }

  function getModuleConfig (module?: string) {
    const allConfig = { ...moduleDefaults }
    store.moduleList.forEach((item: any) => {
      if (allConfig[item.url]) allConfig[item.url] = { ...allConfig[item.url], ...item }
    })
    return module ? allConfig[module] : allConfig
  }

  function checkFormValidate (validateList: Record<string, boolean> = {}) {
    return !Object.values(validateList).some(item => item === false)
  }

  function fillStateByLocalStorage (actionKey: string, cacheKey: string, valueType: string, defaultValue: any) {
    if (!import.meta.client) return
    const localCache = localStorage.getItem(`ShareManBox~${cacheKey}`)
    let finalValue = defaultValue
    try {
      if (valueType === 'number') finalValue = Number.parseInt(localCache || '', 10) || defaultValue
      if (valueType === 'object' || valueType === 'string') finalValue = localCache ? JSON.parse(localCache) : defaultValue
    } catch { finalValue = defaultValue }
    const actions: Record<string, (value: any) => void> = {
      SET_USER: store.setUser,
      SET_HAS_NAVIGATOR: store.setHasNavigator
    }
    actions[actionKey]?.(finalValue)
  }

  function constructTree (originData: any[], idFieldName = 'id', parentIdFieldName = 'parent_id', removeFields: string[] = []) {
    const data = JSON.parse(JSON.stringify(originData || []))
    data.forEach((item: any) => ['children', ...removeFields].forEach((field) => { delete item[field] }))
    const itemMap: Record<string, any> = {}
    data.forEach((item: any) => { itemMap[item[idFieldName]] = item })
    const tree: any[] = []
    data.forEach((item: any) => {
      const parent = itemMap[item[parentIdFieldName]]
      if (parent) (parent.children || (parent.children = [])).push(item)
      else tree.push(item)
    })
    return tree
  }

  function getFilteredTagArray (tagsText = '') {
    const hiddenTags: string[] = []
    return tagsText.trim().split(',').filter(tag => tag && !hiddenTags.includes(tag))
  }

  return {
    getConfig,
    getFileAsset,
    getImageAsset,
    getOssUrl,
    getStringCount,
    getSeoInfo,
    getModuleConfig,
    checkFormValidate,
    fillStateByLocalStorage,
    constructTree,
    getFilteredTagArray
  }
}
