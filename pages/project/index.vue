<style lang="scss">
  .project-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <layout-container>
    <blocker height="40px" />
    <category-box module="project" />
    <blocker height="40px" />
    <div v-if="data.projectCollection" class="project-list">
      <layout-row :gutter="16">
        <layout-col
          v-for="item in data.projectCollection"
          :key="item.id"
          :md="{span:24}"
          :lg="{span:12}"
        >
          <item-project :item="item" />
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
      title: `项目`,
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '项目列表') }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    const { data: projectCollection, meta } = await $axios.$get(`/api/projects`, {
      params: {
        page: query.page,
        categoryId: query.categoryId || ''
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
  watchQuery: ['page', 'categoryId']
}
</script>
