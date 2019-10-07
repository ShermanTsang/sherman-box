<style lang="scss">
  .plan-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <Blocker height="20px" />
    <CategoryBox module="plan" />
    <Blocker height="20px" />
    <div v-if="data.planList && data.planList.length > 0" class="plan-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.planList"
          :key="item.id"
          :md="{span:24}"
          :lg="{span:12}"
          :xl="{span:8}"
        >
          <item-plan :item="item" />
        </layout-col>
      </layout-row>
    </div>
    <Tip v-else>
      暂无内容
    </Tip>
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
      title: '项目',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '项目列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: planList, meta } = await $axios.$get('/api/plans', {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        planList
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'plan', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
