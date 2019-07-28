<style lang="scss">
  .idea-list {
    column-count: 3;
    column-gap: 0;

    &__item {
      box-sizing: border-box;
      break-inside: avoid;
      padding: 10px;
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.ideaCollection" class="idea-list">
      <div
        v-for="item in data.ideaCollection"
        :key="item.id"
        class="idea-list__item"
      >
        <item-idea :item="item" />
      </div>
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
  head() {
    return {
      title: this.$getSeoInfo('title', `想法`),
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '想法列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: ideaCollection, meta } = await $axios.$get(`/api/ideas`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        ideaCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'idea', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
