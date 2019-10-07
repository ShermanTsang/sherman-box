<style lang="scss">
</style>

<template>
  <layout-container>
    <Blocker height="20px" />
    <CategoryBox module="idea" />
    <Blocker height="20px" />
    <Waterfall v-if="data.ideaList && data.ideaList.length > 0">
      <div
        v-for="item in data.ideaList"
        :key="item.id"
        class="waterfall__item"
      >
        <item-idea :item="item" />
      </div>
    </Waterfall>
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
      title: '想法',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '想法列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: ideaList, meta } = await $axios.$get('/api/ideas', {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        ideaList
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({
        name: 'idea',
        query: {
          page: parseInt(currentPage)
        }
      })
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
