<style lang="scss">
  .project-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.projectCollection" class="project-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.projectCollection"
          :key="item.id"
          class="gutter-row"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
        >
          <item-project :item="item" />
        </a-col>
      </a-row>
    </div>
    <blocker height="40px" />
    <pagination :page="parseInt(meta.current_page)" :total="parseInt(meta.total)" :size="parseInt(meta.per_page)" @change="changePage" />
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
      title: this.$getSeoInfo('title', `项目`),
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '项目列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: projectCollection, meta } = await $axios.$get(`/api/projects`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        projectCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'project', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
