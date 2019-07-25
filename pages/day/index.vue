<style lang="scss">
  .day-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.dayCollection" class="day-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.dayCollection"
          :key="item.id"
          class="gutter-row"
          :md="24"
          :lg="12"
          :xl="12"
        >
          <item-day :item="item" />
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
