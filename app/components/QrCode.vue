<style lang="scss">
$prefix: 'qr-code';

.#{$prefix} {
    display: flex;
    color: #999;
    font-size: .9rem;
    align-items: center;
    justify-content: center;
    cursor: default;

    &__divider {
      height: 1px;
      width: 100%;
      background-color: rgba(177, 177, 177, .1);
    }
  }
</style>

<template>
  <div class="qr-code">
    <canvas ref="canvas" :width="size" :height="size" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import QRCode from 'qrcode'

defineOptions({ name: "QrCode" })

const props = defineProps({
  size: { type: Number, default: 120 },
  colorDark: { type: String, default: '#000000' },
  colorLight: { type: String, default: '#ffffff' }
})

const slots = useSlots()
const canvas = ref(null)
let renderSequence = 0

const text = computed(() => (slots.default?.() || [])
  .map(node => typeof node.children === 'string' ? node.children : '')
  .join('')
  .trim())

async function generateQrCodeImage () {
  const sequence = ++renderSequence
  const canvasElement = canvas.value
  if (!canvasElement) return

  const value = text.value
  if (!value) {
    canvasElement.getContext('2d')?.clearRect(0, 0, canvasElement.width, canvasElement.height)
    return
  }

  try {
    await QRCode.toCanvas(canvasElement, value, {
      width: props.size,
      margin: 0,
      errorCorrectionLevel: 'H',
      color: { dark: props.colorDark, light: props.colorLight }
    })
    if (sequence !== renderSequence) return
  } catch (error) {
    console.error('[QrCode] Failed to render QR code.', error)
  }
}

watch(() => [text.value, props.size, props.colorDark, props.colorLight], () => {
  void generateQrCodeImage()
})
onMounted(() => { void generateQrCodeImage() })
onBeforeUnmount(() => { renderSequence++ })
</script>
