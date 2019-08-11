<style lang="scss">
  .mailbox-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <blocker height="20px" />
    <category-box module="mailbox" />
    <blocker height="20px" />
    <div v-if="data.mailboxCollection" class="mailbox-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.mailboxCollection"
          :key="item.id"
          :sm="{span : 24}"
          :md="{span : 12}"
          :lg="{span : 8}"
        >
          <item-mailbox :item="item" />
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
      title: '邮盒',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '邮盒列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: mailboxCollection, meta } = await $axios.$get(`/api/mailboxes`, {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        mailboxCollection
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
