<style lang="scss">
  .blog-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <blocker height="40px" />
    <div v-if="data.blogCollection" class="blog-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.blogCollection"
          :key="item.id"
          :sm="{span : 24}"
          :md="{span : 12}"
          :lg="{span : 8}"
        >
          <item-blog :item="item" />
        </layout-col>
      </layout-row>
    </div>
    <blocker height="40px" />
    <pagination
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <blocker height="40px" />
  </layout-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  head() {
    return {
      title: `博文`,
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '博文列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: blogCollection, meta } = await $axios.$get(`/api/blogs`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        blogCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'blog', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
