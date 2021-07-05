<style lang="scss">
</style>

<template>
  <div>
    <div
      v-if="data.blogItem.image"
      v-lazy:background-image="$getOssUrl(data.blogItem.image)"
      class="fixed top-0 z-1 w-full h-2/3 bg-cover filter blur transform scale-105"
    >
    </div>
    <div class="relative z-2 w-full mx-auto mt-30">
      <LayoutContainer class="bg-white" :class="{'!p-6':data.blogItem.image,'shadow-xl':data.blogItem.image}">
        <div class="mb-10">
          <div class="text-3xl tracking-[1px] text-[#333] mb-4">
            {{ data.blogItem.name }}
          </div>
          <div class="space-y-3 text-[#999] text-sm">
            <div>
              <span>{{ data.blogItem.category ? data.blogItem.category.name : '待分类' }}</span>
              <span v-if="data.blogItem.lark_doc">
                / 文档同步自语雀
              </span>
            </div>
            <div v-if="data.blogItem.lark_doc">
              <Datetime :time="data.blogItem.lark_doc.created_at" type="date" />
              创建,
              <Datetime :time="data.blogItem.lark_doc.updated_at" type="datetime" />
              更新
            </div>
            <div v-else>
              <Datetime :time="data.blogItem.created_at" type="date" />
              创建,
              <Datetime :time="data.blogItem.updated_at" type="datetime" />
              更新
            </div>
          </div>
        </div>
        <HtmlContent v-if="data.blogItem.lark_doc" :content="data.blogItem.lark_doc.content_html" />
        <Markdown v-else :content="data.blogItem.content" />
        <Blocker height="60px" />
        <Comment :id="data.blogItem.id" module="blog" />
      </LayoutContainer>
    </div>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, store, params }) {
    const { data: blogItem } = await $axios.$get(`/api/blogs/${params.id}`)
    store.commit('SET_CURRENT_ITEM', {
      image: blogItem.image,
      name: blogItem.name,
      category: blogItem.category,
      date: blogItem.date
    })
    return {
      data: {
        blogItem
      }
    }
  },
  head () {
    const { name, category, description } = this.data.blogItem
    return {
      title: `${name} - ${category ? category.name : '待分类'} - 博文`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${description || ''}`)
        }
      ]
    }
  }
}
</script>
