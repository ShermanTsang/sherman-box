import Vue from 'vue'
import * as fundebug from 'fundebug-javascript'
import fundebugVue from 'fundebug-vue'

export default () => {
  fundebug.apikey = '6282d7e8519e0803a3eb19938394e3d3216abf46f244db55f9507bb243868101'
  fundebugVue(fundebug, Vue)
}
