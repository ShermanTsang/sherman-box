<style lang="scss">
  .blog-list {
    &__item {
      margin-bottom: 40px;
    }
  }
</style>

<template>
  <LayoutContainer>
    <Blocker height="20px" />
    <CategoryBox module="blog" />
    <Blocker height="20px" />
    <LayoutContainer max-width="1440px">
      <div v-if="data.blogList && data.blogList.length > 0" class="blog-list">
        <ItemBlog v-for="item in data.blogList" :key="item.id" :item="item" class="blog-list__item" />
      </div>
      <Tip v-else>
        暂无内容
      </Tip>
      <Blocker height="40px" />
    </LayoutContainer>
    <Pagination
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <Blocker height="40px" />
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData ({ $axios, query }) {
    const { data: blogList, meta } = await $axios.$get('/api/blogs', {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        blogList
      },
      meta
    }
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    changePage (currentPage) {
      this.$router.push({ name: 'blog', query: { page: parseInt(currentPage) } })
    }
  },
  head () {
    return {
      title: '博文',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '博文列表') }
      ]
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
