<style lang="scss">
</style>

<template>
  <LayoutContainer>
    <Tip lottie="404">
      您访问的页面丢失
    </Tip>
  </LayoutContainer>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

const __legacyOptions = {
  asyncData ({ params }) {
    return {}
  },
  mounted () {
  },
  methods: {},
  head () {
    return {
      title: '页面不存在',
      meta: [
        { hid: '404', name: 'description', content: this.$getSeoInfo('description', '页面不存在') }
      ]
    }
  }
}

definePageMeta({ layout: 'default', middleware: ['redirect'] })

const { data, meta } = await useLegacyOptions(__legacyOptions, {})
</script>
