import Vue from 'vue'

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
  })

  $axios.onResponse((response) => {
    if (process.client) {
      const { event, message } = response.data
      if (event === 'returnErrorMessage' || event === 6000) {
        Vue.prototype.$message.error(message)
        return Promise.reject(message)
      }
      if (event === 'returnInfoMessage') {
        Vue.prototype.$message.info(message)
      }
      if (event === 'returnSuccessMessage') {
        Vue.prototype.$message.success(message)
      }
      if (event === 'returnWarningMessage') {
        Vue.prototype.$message.warning(message)
      }
    }
  })

  $axios.onError((error) => {
    const statusCode = Number.parseInt(error.response && error.response.status)
    const statusCustomText = error.response && error.response.statusCustomText
    if (statusCode === 500) {
      redirect('/error', { statusCode, statusCustomText })
    }
  })

  $axios.onRequestError((error) => {
    console.log(error)
  })

  $axios.onResponseError((error) => {
    console.log(error)
  })
}
