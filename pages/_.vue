<style lang="scss">
  #svgContainer {
    width: 640px;
    height: 512px;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>

<template>
  <layout-container>
    <div id="svgContainer"></div>
  </layout-container>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'redirect',
  asyncData({ params }) {
    return {}
  },
  mounted() {
    this.drawSvg()
  },
  methods: {
    drawSvg() {
    }
  }
}
</script>
