<style lang="scss">
  .movie-list {
    &__item {
      margin-bottom: 30px;
    }
  }
</style>

<template>
  <layout-container>
    <Blocker height="20px" />
    <CategoryBox module="movie" />
    <Blocker height="20px" />
    <div v-if="data.movieList" class="movie-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.movieList"
          :key="item.id"
          :xs="{span:24}"
          :sm="{span:24}"
          :md="{span:24}"
          :lg="{span:24}"
          :xl="{span:12}"
          :xxl="{span:8}"
        >
          <item-movie :item="item" />
        </layout-col>
      </layout-row>
    </div>
    <Blocker height="40px" />
    <Pagination
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <Blocker height="40px" />
  </layout-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  head() {
    return {
      title: `观影`,
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '观影列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: movieList, meta } = await $axios.$get(`/api/movies`, {
      params: {
        pageSize: 8,
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        movieList
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'movie', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
