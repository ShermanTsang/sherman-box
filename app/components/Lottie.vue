<style lang="scss">
</style>

<template>
  <ClientOnly placeholder="Loading...">
    <div ref="container" class="w-max-full overflow-hidden" :style="containerStyle" />
  </ClientOnly>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'Lottie' })

const props = defineProps({
  name: { type: String, default: '' },
  height: { type: Number, default: 400 },
  width: { type: Number, default: 400 },
  speed: { type: [String, Number], default: 1 },
  loop: { type: [Number, Boolean], default: true }
})

const container = ref(null)
const animation = ref(null)
const dimensions = ref({ width: props.width, height: props.height })
const containerStyle = computed(() => ({
  width: `${dimensions.value.width}px`,
  height: `${dimensions.value.height}px`
}))
const animations = import.meta.glob('../assets/animation/*.json', { import: 'default' })
let loadSequence = 0

function setCompatibleSize () {
  const { clientWidth, clientHeight } = document.body
  dimensions.value = {
    height: Math.min(clientHeight || props.height, props.height),
    width: Math.min(clientWidth || props.width, props.width)
  }
}

async function loadAnimation () {
  const sequence = ++loadSequence
  animation.value?.destroy()
  animation.value = null
  if (!container.value || !props.name) return

  const assetPath = `../assets/animation/${props.name}.json`
  const loadAsset = animations[assetPath]
  if (!loadAsset) {
    console.warn(`[Lottie] Animation "${props.name}" was not found.`)
    return
  }

  try {
    const animationData = await loadAsset()
    if (sequence !== loadSequence || !container.value) return

    const lottie = useNuxtApp().$lottie
    animation.value = lottie.loadAnimation({
      container: container.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: true,
      animationData
    })
    animation.value.setSpeed(Number(props.speed) || 1)
  } catch (error) {
    console.error(`[Lottie] Failed to load animation "${props.name}".`, error)
  }
}

onMounted(() => {
  setCompatibleSize()
})
watch(container, (element) => {
  if (element) void loadAnimation()
}, { flush: 'post' })
watch(() => props.name, () => { void loadAnimation() })
watch(() => props.speed, value => animation.value?.setSpeed(Number(value) || 1))
watch(() => props.loop, value => animation.value?.setLoop(value))
onBeforeUnmount(() => {
  loadSequence++
  animation.value?.destroy()
})
</script>
