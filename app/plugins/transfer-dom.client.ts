function getTarget (value: any) {
  if (value === undefined || value === 'body' || value === true || (typeof value === 'string' && value.startsWith('?'))) return document.body
  if (typeof value === 'string' && value.includes('?')) value = value.split('?')[0]
  return value instanceof Node ? value : document.querySelector(value)
}

function shouldUpdate (value: any) {
  if (typeof value !== 'string' || !value.includes('?')) return false
  try { return JSON.parse(value.split('?')[1]).autoUpdate || false } catch { return false }
}

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('transfer-dom', {
    mounted (element, binding) {
      element.classList.add('v-transfer-dom')
      const parent = element.parentNode
      const home = document.createComment('transfer-dom')
      const target = getTarget(binding.value)
      const moved = binding.value !== false
      if (moved && parent && target) {
        parent.replaceChild(home, element)
        target.appendChild(element)
      }
      ;(element as any).__transferDomData = { parent, home, target, moved }
    },
    updated (element, binding) {
      if (!shouldUpdate(binding.value)) return
      const data = (element as any).__transferDomData
      if (!data) return
      const target = getTarget(binding.value)
      if (!data.moved && binding.value && target) {
        data.parent?.replaceChild(data.home, element)
        target.appendChild(element)
        data.moved = true
      } else if (data.moved && binding.value === false) {
        data.parent?.replaceChild(element, data.home)
        data.moved = false
      } else if (binding.value && target) target.appendChild(element)
    },
    unmounted (element) {
      const data = (element as any).__transferDomData
      if (data?.moved && data.parent) data.parent.appendChild(element)
      element.classList.remove('v-transfer-dom')
      delete (element as any).__transferDomData
    }
  })
})
