export default function ({ route, redirect }) {
  const path = route.params.pathMatch

  const isDate = /^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(path)
  if (isDate) {
    return redirect(`/day/${path}`)
  }

  const isTimeline = path === 'timeline'
  if (isTimeline) {
    return redirect('/')
  }
}
