import Vue from 'vue'

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
  })

  $axios.onResponse((response) => {
    if (process.client) {
      const { event, message } = response.data
      if (event === 'returnErrorMessage') {
        Vue.prototype.$message.error(message)
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
    const code = Number.parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/error')
    }
  })

  $axios.onRequestError((error) => {
    console.log(error)
  })

  $axios.onResponseError((error) => {
    console.log(error)
  })
}
