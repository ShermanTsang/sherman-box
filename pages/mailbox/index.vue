<style lang="scss">
  .mailbox-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <Blocker height="20px" />
    <CategoryBox module="mailbox" />
    <Blocker height="20px" />
    <div v-if="data.mailboxList" class="mailbox-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.mailboxList"
          :key="item.id"
          :sm="{span : 24}"
          :md="{span : 12}"
          :lg="{span : 8}"
        >
          <item-mailbox :item="item" />
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
      title: '邮盒',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '邮盒列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: mailboxList, meta } = await $axios.$get(`/api/mailboxes`, {
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
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'mailbox', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
