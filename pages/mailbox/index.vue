<style lang="scss">
  .mailbox-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <LayoutContainer>
    <Blocker height="48px" />
    <CategoryBox module="mailbox" />
    <Blocker height="20px" />
    <div v-if="data.mailboxList && data.mailboxList.length > 0" class="mailbox-list">
      <LayoutRow :gutter="16">
        <LayoutCol
          v-for="item in data.mailboxList"
          :key="item.id"
          :sm="{span : 24}"
          :md="{span : 12}"
          :lg="{span : 8}"
        >
          <ItemMailbox :item="item" />
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
export default {
  async asyncData ({ $axios, query }) {
    const { data: mailboxList, meta } = await $axios.$get('/api/mailboxes', {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        mailboxList
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
      this.$router.push({ name: 'mailbox', query: { page: parseInt(currentPage) } })
    }
  },
  head () {
    return {
      title: '邮盒',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '邮盒列表') }
      ]
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
