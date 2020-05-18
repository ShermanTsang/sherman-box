<style lang="scss">
  .day-list {
    &__item {
      margin-bottom: 30px;
    }
  }
</style>

<template>
  <LayoutContainer>
    <Blocker height="20px" />
    <div v-if="data.dayList" class="day-list">
      <LayoutRow :gutter="16">
        <LayoutCol
          v-for="item in data.dayList"
          :key="item.id"
          :xs="{span:24}"
          :sm="{span:24}"
          :md="{span:12}"
          :lg="{span:12}"
          :xl="{span:8}"
        >
          <ItemDay :item="item" />
        </LayoutCol>
      </LayoutRow>
    </div>
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
export default {
  async asyncData ({ $axios, query }) {
    const { data: dayList, meta } = await $axios.$get('/api/days', {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        dayList
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
      this.$router.push({ name: 'day', query: { page: parseInt(currentPage) } })
    }
  },
  head () {
    return {
      title: '日迹',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '日迹列表') }
      ]
    }
  },
  watchQuery: ['page']
}
</script>
