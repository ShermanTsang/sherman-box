<style lang="scss">
  .project-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <Blocker height="20px" />
    <CategoryBox module="project" />
    <Blocker height="20px" />
    <div v-if="data.projectList" class="project-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.projectList"
          :key="item.id"
          :md="{span:24}"
          :lg="{span:12}"
        >
          <item-project :item="item" />
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
      title: `项目`,
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '项目列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: projectList, meta } = await $axios.$get(`/api/projects`, {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
      }
    })
    return {
      data: {
        projectList
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
  watchQuery: ['page', 'categoryId']
}
</script>
