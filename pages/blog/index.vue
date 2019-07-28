<style lang="scss">
  .blog-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.blogCollection" class="blog-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.blogCollection"
          :key="item.id"
          class="gutter-row"
          :md="24"
          :lg="12"
          :xl="8"
        >
          <item-blog :item="item" />
        </a-col>
      </a-row>
    </div>
    <blocker height="40px" />
    <pagination
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <blocker height="40px" />
  </container>
</template>

<script>
export default {
  data() {
    return {}
  },
  head() {
    return {
      title: this.$getSeoInfo('title', `博文`),
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
