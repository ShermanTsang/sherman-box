import Vue from 'vue'
// import Antd from 'ant-design-vue/lib'
// import { Row, Pagination, Popconfirm } from 'ant-design-vue'
import { Row, Col, Pagination, Popconfirm } from 'ant-design-vue'

export default () => {
  // Vue.use(Antd)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Pagination)
  Vue.use(Popconfirm)
  // Vue.component(Row.name, Row)
  // Vue.component(Col.name, Col)
  // Vue.component(Pagination.name, Pagination)
  // Vue.component(Popconfirm.name, Popconfirm)
}
