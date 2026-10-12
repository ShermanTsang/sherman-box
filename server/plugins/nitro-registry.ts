const nitroAppKey = Symbol.for('sherman-box.nuxt.nitro-app')

export default defineNitroPlugin((nitroApp) => {
  ;(globalThis as any)[nitroAppKey] = nitroApp
})
