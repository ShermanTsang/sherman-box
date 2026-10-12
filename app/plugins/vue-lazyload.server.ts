export default defineNuxtPlugin((nuxtApp) => {
  const serverDirective = { getSSRProps: () => ({}) }
  nuxtApp.vueApp.directive('lazy', serverDirective)
  nuxtApp.vueApp.directive('lazy-container', serverDirective)
})
