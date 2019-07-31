<style lang="scss">
  .movie-list {
    &__item {
      margin-bottom: 30px;
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.movieCollection" class="movie-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.movieCollection"
          :key="item.id"
          class="gutter-row"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="8"
        >
          <item-movie :item="item" />
        </a-col>
      </a-row>
    </div>
    <blocker height="40px" />
    <pagination :page="parseInt(meta.current_page)" :total="parseInt(meta.total)" :size="parseInt(meta.per_page)" @change="changePage" />
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
      title: `观影`,
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '观影列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: movieCollection, meta } = await $axios.$get(`/api/movies`, {
      params: {
        pageSize: 12,
        page: query.page
      }
    })
    return {
      data: {
        movieCollection
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
  watchQuery: ['page']
}
</script>
