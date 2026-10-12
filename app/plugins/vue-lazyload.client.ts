import VueLazyload from 'vue-lazyload'
import imageLoading from '@/assets/image/imageLoading.gif'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1,
    loading: imageLoading
  })
})
