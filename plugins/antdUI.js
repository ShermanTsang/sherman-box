import Vue from 'vue'
import 'ant-design-vue/lib/grid/style/index.css'
import 'ant-design-vue/lib/select/style/index.css'
import 'ant-design-vue/lib/input/style/index.css'
import 'ant-design-vue/lib/button/style/index.css'
import { Row, Col } from 'ant-design-vue'

export default () => {
  // Vue.use(Antd)
  Vue.use(Row)
  Vue.use(Col)
  // Vue.component(Row.name, Row)
  // Vue.component(Col.name, Col)
  // Vue.component(Pagination.name, Pagination)
  // Vue.component(Popconfirm.name, Popconfirm)
}
