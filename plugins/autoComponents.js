// 引入vue 及 lodash
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'

/* Component 自动注册 */
const requireComponent = require.context('../components', false, /[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig)
})
const nextComponents = require.context(
  '../components', // 其组件目录的相对路径
  true, // 是否查询其子目录
  /\.vue$/ // 匹配基础组件文件名的正则表达式
)
nextComponents.keys().forEach((fileName) => {
  const componentConfig = nextComponents(fileName)
  const componentName = kebabCase(
    fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
