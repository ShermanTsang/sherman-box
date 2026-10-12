import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const extraPages = [
  { name: '索引', url: 'sitemap.xml', isExtra: true },
  { name: '更新', url: 'page/log', isExtra: true }
]

const statisticsName: Record<string, string> = {
  total: '总计',
  total_today: '今日',
  total_week: '本周',
  total_month: '本月',
  total_year: '今年'
}

export const useAppStore = defineStore('app', () => {
  const hasNavigator = ref(false)
  const currentPage = ref<Record<string, unknown>>({})
  const currentItem = ref<Record<string, unknown>>({})
  const configurationList = ref<any[]>([])
  const fileAssetList = ref<any[]>([])
  const imageAssetList = ref<any[]>([])
  const moduleList = ref<any[]>([])
  const pageList = ref<any[]>([])
  const categoryList = ref<any[]>([])
  const statisticsModule = ref<any[]>([])
  const user = ref<Record<string, unknown>>({})

  const pagesWithExtras = computed(() => [...pageList.value, ...extraPages])
  const modulesWithExtras = computed(() => [...moduleList.value])
  const statisticsWithText = computed(() => statisticsModule.value.map((module) => {
    const text = Object.keys(module)
      .map((key) => (statisticsName[key] && module[key] > 0 ? `${statisticsName[key]} ${module[key]}` : ''))
      .filter(Boolean)
      .join(' ')
    return { ...module, text }
  }))

  function setCurrentPage (value: Record<string, unknown>) { currentPage.value = value }
  function setCurrentItem (value: Record<string, unknown>) { currentItem.value = value }
  function setConfigurationList (value: any[]) { configurationList.value = value || [] }
  function setFileAssetList (value: any[]) { fileAssetList.value = value || [] }
  function setImageAssetList (value: any[]) { imageAssetList.value = value || [] }
  function setModuleList (value: any[]) { moduleList.value = value || [] }
  function setPageList (value: any[]) { pageList.value = value || [] }
  function setCategoryList (value: any[]) { categoryList.value = value || [] }
  function setStatisticsModule (value: any[]) { statisticsModule.value = value || [] }
  function setUser (value: Record<string, unknown>) {
    user.value = value || {}
    if (import.meta.client) {
      try { localStorage.setItem('ShareManBox~user', JSON.stringify(user.value)) } catch (error) { console.warn(error) }
    }
  }
  function setHasNavigator (value: boolean) {
    hasNavigator.value = value
    if (import.meta.client) {
      try { localStorage.setItem('ShareManBox~hasNavigator', JSON.stringify(value)) } catch (error) { console.warn(error) }
    }
  }

  async function loadInitialData () {
    const api = useApi()
    const [configurations, fileAssets, imageAssets, modules, pages] = await Promise.allSettled([
      api.get('/api/configurations'),
      api.get('/api/fileAssets'),
      api.get('/api/imageAssets'),
      api.get('/api/modules'),
      api.get('/api/pages')
    ])
    const getData = (result: PromiseSettledResult<any>) => result.status === 'fulfilled' ? result.value?.data || [] : []
    setConfigurationList(getData(configurations))
    setFileAssetList(getData(fileAssets))
    setImageAssetList(getData(imageAssets))
    setModuleList(getData(modules))
    setPageList(getData(pages))
  }

  return {
    hasNavigator,
    currentPage,
    currentItem,
    configurationList,
    fileAssetList,
    imageAssetList,
    moduleList,
    pageList,
    categoryList,
    statisticsModule,
    user,
    pagesWithExtras,
    modulesWithExtras,
    statisticsWithText,
    setCurrentPage,
    setCurrentItem,
    setConfigurationList,
    setFileAssetList,
    setImageAssetList,
    setModuleList,
    setPageList,
    setCategoryList,
    setStatisticsModule,
    setUser,
    setHasNavigator,
    loadInitialData
  }
})
