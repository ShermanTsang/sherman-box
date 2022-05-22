<style lang="scss">
.word {
}
</style>

<template>
  <LayoutContainer>
    <Blocker height="48px" />
    <CategoryBox module="word" />
    <Blocker height="20px" />
    <Waterfall v-if="data.wordList && data.wordList.length > 0" gap="16px">
      <div
        v-for="item in data.wordList"
        :key="item.id"
      >
        <item-word :item="item" />
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
    const { data: wordList, meta } = await $axios.$get('/api/words', {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        wordList
      },
      meta
    }
  },
  data () {
    return {}
  },
  head () {
    return {
      title: '话语',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '话语列表') }
      ]
    }
  },
  watchQuery: ['page', 'categoryId'],
  mounted () {
  },
  methods: {
    changePage (currentPage) {
      this.$router.push({
        name: 'word',
        query: {
          page: parseInt(currentPage)
        }
      })
    }
  }
}
</script>
