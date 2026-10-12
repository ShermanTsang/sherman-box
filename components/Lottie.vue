<style lang="scss">
</style>

<template>
  <client-only placeholder="Loading...">
    <div class="w-max-full overflow-hidden">
      <component
        v-if="name && state.isReady && lottieComponent"
        :is="lottieComponent"
        :name="name"
        :options="config.defaultOptions"
        :height="config.height"
        :width="config.width"
        :loop="loop"
        @animCreated="handleAnimation"
      />
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Lottie',
  props: {
    name: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 400
    },
    speed: {
      type: [String, Number],
      default: 1
    },
    loop: {
      type: [Number, Boolean],
      default: true
    }
  },
  data () {
    return {
      data: {
        animation: {}
      },
      state: {
        isReady: false
      },
      lottieComponent: null,
      config: {
        defaultOptions: {
          animationData: require(`../assets/animation/${this.name}.json`)
        },
        height: this.height,
        width: this.width
      }
    }
  },
  mounted () {
    this.setCompatibleSize()
    // lottie-web reads `document` during module initialization, so only load
    // the player after this component has mounted in the browser.
    import('vue-lottie/src/lottie.vue').then(({ default: Lottie }) => {
      this.lottieComponent = Lottie
    })
  },
  methods: {
    handleAnimation (animation) {
      this.data.animation = animation
      this.data.animation.setSpeed(this.speed)
    },
    setCompatibleSize () {
      const { clientWidth, clientHeight } = document.body
      this.config.height = clientHeight < this.config.height ? clientHeight : this.height
      this.config.width = clientWidth < this.config.width ? clientWidth : this.width
      this.state.isReady = true
    }
  }
}
</script>
