<style lang="scss">
  .blog-list {
    &__item {
      margin-bottom: 40px;
    }
  }
</style>

<template>
  <LayoutContainer>
    <Blocker height="48px" />
    <LayoutContainer max-width="1440px">
      <Tabs :tabs="[{text:'目录模式',name:'catalog',icon:'post'},{text:'列表模式',name:'list',icon:'category'}]" @select="changeTab">
        <div slot="catalog">
          <CatalogTree v-show="status.mode === 'catalog'" :data="blogCatalog" />
        </div>
        <div slot="list">
          <div v-if="data.blogList && data.blogList.length > 0" class="blog-list">
            <ItemBlog v-for="item in data.blogList" :key="item.id" :item="item" class="blog-list__item" />
          </div>
          <Tip v-else>
            暂无内容
          </Tip>
        </div>
      </Tabs>
    </LayoutContainer>
    <Pagination
      v-show="status.mode === 'list'"
      type="page"
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
    return {
      status: {
        mode: 'catalog'
      }
    }
  },
  computed: {
    blogCatalog () {
      const blogCategoryList = this.$store.getters.categoryList.filter((item) => {
        return item.module === 'blog'
      })
      return this.$constructTree(blogCategoryList, 'id', 'parent_id', ['sub_categories', 'parent_category'])
    }
  },
  mounted () {
  },
  methods: {
    changePage (currentPage) {
      this.$router.push({ name: 'blog', query: { page: parseInt(currentPage) } })
    },
    changeTab ({ name }) {
      this.status.mode = name
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
