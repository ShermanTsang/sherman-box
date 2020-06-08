<style lang="scss">
  .idea {
  }
</style>

<template>
  <LayoutContainer>
    <Blocker height="48px" />
    <CategoryBox module="idea" />
    <Blocker height="20px" />
    <Waterfall v-if="data.ideaList && data.ideaList.length > 0" gap="16px">
      <div
        v-for="item in data.ideaList"
        :key="item.id"
        class="idea__item"
      >
        <item-idea :item="item" />
      </div>
    </Waterfall>
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
export default {
  async asyncData ({ $axios, query }) {
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
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    changePage (currentPage) {
      this.$router.push({
        name: 'idea',
        query: {
          page: parseInt(currentPage)
        }
      })
    }
  },
  head () {
    return {
      title: '想法',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '想法列表') }
      ]
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
