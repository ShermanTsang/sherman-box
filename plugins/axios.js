export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
  })

  $axios.onResponse((response) => {
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
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
