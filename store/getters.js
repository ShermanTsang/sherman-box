export default {
  currentPage (state) {
    return state.currentPage
  },
  currentItem (state) {
    return state.currentItem
  },
  configurationList (state) {
    return state.configurationList
  },
  fileAssetList (state) {
    return state.fileAssetList
  },
  imageAssetList (state) {
    return state.imageAssetList
  },
  moduleList (state) {
    const extraModule = [
      { name: '轴线', url: 'timeline', icon: 'iconfont icon-schedule' }
    ]
    return [...extraModule, ...state.moduleList]
  },
  pageList (state) {
    const extraPage = [
      { name: '索引', url: 'sitemap.xml', isExtra: true },
      { name: '开发日志', url: 'page/log', isExtra: true }
    ]
    return [...state.pageList, ...extraPage]
  },
  categoryList (state) {
    return state.categoryList
  },
  statisticsModule (state) {
    const statisticsData = state.statisticsModule
    const statisticsName = {
      total: '总计',
      total_today: '今日',
      total_week: '本周',
      total_month: '本月',
      total_year: '今年'
    }
    statisticsData.forEach((module) => {
      module.text = Object.keys(module).map((key) => {
        if (statisticsName[key] && module[key] > 0) {
          return `${statisticsName[key]} ${module[key]}`
        }
      }).join(' ') || ''
    })
    return statisticsData
  },
  user (state) {
    return state.user
  },
  hasNavigator (state) {
    return state.hasNavigator
  }
}
