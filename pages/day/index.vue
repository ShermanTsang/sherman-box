<style lang="scss">
  .day-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <Blocker height="20px" />
    <div v-if="data.dayList" class="day-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.dayList"
          :key="item.id"
          :md="{span:24}"
          :lg="{span:24}"
          :xl="{span:12}"
        >
          <item-day :item="item" />
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
      title: `日迹`,
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '日迹列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: dayList, meta } = await $axios.$get(`/api/days`, {
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
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'day', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
