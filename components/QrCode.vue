<style lang="scss">
  .qr-code {
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
    <div id="qrCodeImage"></div>
  </div>
</template>

<script>
export default {
  name: 'QrCode',
  props: {
    size: {
      type: Number,
      default: 120
    },
    colorDark: {
      type: String,
      default: '#000000'
    },
    colorLight: {
      type: String,
      default: '#ffffff'
    }
  },
  computed: {
  },
  mounted () {
    this.generateQrCodeImage()
  },
  methods: {
    generateQrCodeImage (text = this.$slots.default[0].text || '') {
      const qrCodeImageNode = document.getElementById('qrCodeImage')
      qrCodeImageNode.innerHTML = ''
      const qrCode = new this.$qrcode(qrCodeImageNode, {
        width: this.size,
        height: this.size,
        colorDark: this.colorDark,
        colorLight: this.colorLight,
        correctLevel: this.$qrcode.CorrectLevel.H
      })
      qrCode.makeCode(text)
    }
  }
}
</script>
