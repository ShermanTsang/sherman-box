import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import ImageLoading from 'assets/image/imageLoading.gif'
// import ImageError from 'assets/image/imageError.png'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: ImageLoading
  // error: ImageError,
})
