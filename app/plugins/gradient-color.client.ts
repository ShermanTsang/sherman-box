import Grade from 'grade-js'

export default defineNuxtPlugin(() => ({
  provide: {
    gradientColor (selector: string) {
      try { Grade(document.querySelectorAll(selector)) } catch (error) { console.warn(error) }
    }
  }
}))
