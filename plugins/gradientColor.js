import Vue from 'vue'
import Grade from 'grade-js'

export default () => {
  function renderGradientColor(selector) {
    try {
      Grade(document.querySelectorAll(selector))
    } catch (e) {
      console.log(e)
    }
  }

  Vue.prototype.$gradientColor = renderGradientColor
}
