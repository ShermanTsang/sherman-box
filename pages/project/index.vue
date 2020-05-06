<style lang="scss">
  .project-list {
    &__item {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <LayoutContainer>
    <Blocker height="20px" />
    <CategoryBox module="project" />
    <Blocker height="20px" />
    <div v-if="data.projectList && data.projectList.length > 0" class="project-list">
      <LayoutRow :gutter="16">
        <LayoutCol
          v-for="item in data.projectList"
          :key="item.id"
          :md="{span:24}"
          :lg="{span:12}"
        >
          <ItemProject :item="item" />
        </LayoutCol>
      </LayoutRow>
    </div>
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
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData ({ $axios, query }) {
    const { data: projectList, meta } = await $axios.$get('/api/projects', {
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
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    changePage (currentPage) {
      this.$router.push({ name: 'project', query: { page: parseInt(currentPage) } })
    }
  },
  head () {
    return {
      title: '项目',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '项目列表') }
      ]
    }
  },
  watchQuery: ['page', 'categoryId']
}
</script>
