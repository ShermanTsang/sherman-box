import { useAppStore } from '~/stores/app'

export default defineNuxtPlugin(async () => {
  await useAppStore().loadInitialData()
})
