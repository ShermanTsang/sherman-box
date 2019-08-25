import Vue from 'vue'
import messageComponent from '@/components/Message.vue'

export default function () {
  function showMessage(type, text, icon = 'info', duration = 3000, callBack) {
    const MessageConstructor = Vue.extend(messageComponent)
    const messageDom = new MessageConstructor({
      el: document.createElement('div'),
      data() {
        return {
          type,
          icon,
          text,
          isShow: true
        }
      }
    })
    document.body.appendChild(messageDom.$el)
    setTimeout(() => {
      messageDom.isShow = false
      callBack && (typeof callBack === 'function') && callBack()
    }, duration)
    setTimeout(() => {
      document.body.removeChild(messageDom.$el)
    }, duration + 1000)
  }

  Vue.prototype.$message = {
    info(text, callBack) {
      if (!text) return
      showMessage('info', text, callBack)
    },
    success(text, callBack) {
      if (!text) return
      showMessage('success', text, callBack)
    },
    error(text, callBack) {
      if (!text) return
      showMessage('error', text, callBack)
    },
    warning(text, callBack) {
      if (!text) return
      showMessage('warning', text, callBack)
    }
  }
}
