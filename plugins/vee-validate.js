import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import languagePackage from 'vee-validate/dist/locale/zh_CN'

export default () => {
  Vue.use(VeeValidate)
  Validator.localize('zh_CN', languagePackage)
}
