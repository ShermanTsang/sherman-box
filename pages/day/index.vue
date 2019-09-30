<style lang="scss">
  .day-list {
  }
</style>

<template>
  <layout-container>
    <Blocker height="20px" />
    <div v-if="data.dayList" class="day-list">
      <Waterfall gap="10px">
        <div
          v-for="item in data.dayList"
          :key="item.id"
          class="waterfall__item"
        >
          <item-day :item="item" />
        </div>
      </Waterfall>
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
import Waterfall from '../../components/Waterfall'

export default {
  components: { Waterfall },
  data() {
    return {}
  },
  head() {
    return {
      title: '日迹',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '日迹列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
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
