<style lang="scss">
</style>

<template>
  <client-only placeholder="Loading...">
    <div class="w-max-full overflow-hidden">
      <lottie
        v-if="name && state.isReady"
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
import Lottie from 'vue-lottie/src/lottie.vue'

export default {
  name: 'Lottie',
  components: {
    lottie: Lottie
  },
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
