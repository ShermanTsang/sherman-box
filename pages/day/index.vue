<style lang="scss">
  .day-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <blocker height="40px" />
    <div v-if="data.dayCollection" class="day-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.dayCollection"
          :key="item.id"
          :md="{span:24}"
          :lg="{span:24}"
          :xl="{span:12}"
        >
          <item-day :item="item" />
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
      title: `日迹`,
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '日迹列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: dayCollection, meta } = await $axios.$get(`/api/days`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        dayCollection
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
