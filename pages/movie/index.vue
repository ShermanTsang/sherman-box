<style lang="scss">
  .movie-list {
    &__item {
      margin-bottom: 30px;
    }
  }
</style>

<template>
  <LayoutContainer>
<!--    <ItemModule :item="moduleList.find(item => item.slug === 'movie')" class="mt-10"/>-->
    <Blocker height="48px" />
    <CategoryBox module="movie" />
    <Blocker height="20px" />
    <div v-if="data.movieList && data.movieList.length > 0" class="movie-list">
      <LayoutRow :gutter="16">
        <LayoutCol
          v-for="item in data.movieList"
          :key="item.id"
          :xs="{span:24}"
          :sm="{span:24}"
          :md="{span:12}"
          :lg="{span:8}"
          :xl="{span:6}"
        >
          <ItemMovie :item="item" />
        </LayoutCol>
      </LayoutRow>
    </div>
    <Tip v-else>
      暂无内容
    </Tip>
    <Blocker height="40px" />
    <Pagination
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
import { mapGetters } from 'vuex'

export default {
  async asyncData ({ $axios, query }) {
    const { data: movieList, meta } = await $axios.$get('/api/movies', {
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
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['moduleList'])
  },
  methods: {
    changePage (currentPage) {
      this.$router.push({ name: 'movie', query: { page: parseInt(currentPage) } })
    }
  },
  head () {
    return {
      title: '观影',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '观影列表') }
      ]
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
