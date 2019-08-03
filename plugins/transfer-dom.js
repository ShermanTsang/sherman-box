import Vue from 'vue'

export default function () {
  function getTarget(node) {
    if (node === void 0) {
      return document.body
    }

    if (typeof node === 'string' && node.indexOf('?') === 0) {
      return document.body
    } else if (typeof node === 'string' && node.indexOf('?') > 0) {
      node = node.split('?')[0]
    }

    if (node === 'body' || node === true) {
      return document.body
    }

    return node instanceof window.Node ? node : document.querySelector(node)
  }

  function getShouldUpdate(node) {
    // do not updated by default
    if (!node) {
      return false
    }
    if (typeof node === 'string' && node.indexOf('?') > 0) {
      try {
        const config = JSON.parse(node.split('?')[1])
        return config.autoUpdate || false
      } catch (e) {
        return false
      }
    }
    return false
  }

  Vue.directive('transfer-dom', {
    inserted(el, { value }, vnode) {
      el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom'
      const parentNode = el.parentNode
      const home = document.createComment('')
      let hasMovedOut = false

      if (value !== false) {
        parentNode.replaceChild(home, el) // moving out, el is no longer in the document
        getTarget(value).appendChild(el) // moving into new place
        hasMovedOut = true
      }
      if (!el.__transferDomData) {
        el.__transferDomData = {
          parentNode: parentNode,
          home: home,
          target: getTarget(value),
          hasMovedOut: hasMovedOut
        }
      }
    },
    componentUpdated(el, { value }) {
      const shouldUpdate = getShouldUpdate(value)
      if (!shouldUpdate) {
        return
      }
      // need to make sure children are done updating (vs. `update`)
      const ref$1 = el.__transferDomData
      // homes.get(el)
      const parentNode = ref$1.parentNode
      const home = ref$1.home
      const hasMovedOut = ref$1.hasMovedOut // recall where home is

      if (!hasMovedOut && value) {
        // remove from document and leave placeholder
        parentNode.replaceChild(home, el)
        // append to target
        getTarget(value).appendChild(el)
        el.__transferDomData = Object.assign({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(value) })
      } else if (hasMovedOut && value === false) {
        // previously moved, coming back home
        parentNode.replaceChild(el, home)
        el.__transferDomData = Object.assign({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(value) })
      } else if (value) {
        // already moved, going somewhere else
        getTarget(value).appendChild(el)
      }
    },
    unbind: function unbind(el, binding) {
      el.className = el.className.replace('v-transfer-dom', '')
      if (el.__transferDomData && el.__transferDomData.hasMovedOut === true) {
        el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el)
      }
      el.__transferDomData = null
    }
  })
}
