<style lang="scss">
  .page {
  }
</style>

<template>
  <LayoutContainer class="page">
    <Blocker height="40px" />
    <Nameplate :title="data.pageItem.name" :sub-title="data.pageItem.url" />
    <Markdown :content="data.pageItem.content" />
    <Blocker height="40px" />
    <Comment :id="data.pageItem.id" module="page" />
  </LayoutContainer>
</template>

<script setup>

import { useLegacyOptions } from '~/composables/useLegacyOptions'

definePageMeta({ validate: (route) => { const params = route.params; const customPageNameArray = ['log']
    return params.url && !customPageNameArray.includes(params.url) } })

const __legacyOptions = {
  async asyncData ({ $axios, params }) {
    const { data: pageItem } = await $axios.$get(`/api/pages/${params.url}`)
    return {
      data: {
        pageItem
      }
    }
  },
  mounted () {
  },
  head () {
    return {
      title: `${this.data.pageItem.name} - 页面`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', this.data.pageItem.description || '')
        }
      ]
    }
  }
}

const { data, meta } = await useLegacyOptions(__legacyOptions, {})

</script>
