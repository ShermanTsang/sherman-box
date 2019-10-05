<style lang="scss">
  .pagination {
    margin: 0 auto;
    text-align: center;

    &__item {
      display: inline-block;
      padding: 6px 10px;
      color: #999;
      font-size: 1rem;
      margin: 0 2px;
      cursor: pointer;
      border-radius: 2px;
    }

    &__item--active {
      border-color: $theme-color;
      color: $theme-color;
      border-bottom: 2px solid $theme-color;
    }

    &__item--action {
      color: #999;
    }

  }
</style>

<template>
  <div v-if="total > 1" class="pagination">
    <div class="pagination__item pagination__item--action" @click="jumpPage(currentPage - 1)">
      <Icon name="angle-left" />
    </div>
    <div
      v-for="item in displayPageList"
      :key="item"
      class="pagination__item"
      :class="{'pagination__item--active': parseInt(currentPage) === parseInt(item) }"
      @click="jumpPage(item)"
    >
      <template v-if="item === 0">
        ...
      </template>
      <template v-else>
        {{ item }}
      </template>
    </div>
    <div class="pagination__item pagination__item--action" @click="jumpPage(currentPage + 1)">
      <Icon name="angle-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: parseInt(this.$route.query.page) || 1
    }
  },
  computed: {
    displayPageList() {
      const pageNum = Math.ceil(this.total / this.size) || 0
      const index = this.currentPage
      const arr = []
      if (pageNum <= 6) {
        for (let i = 1; i <= pageNum; i++) {
          arr.push(i)
        }
        return arr
      }
      if (index <= 2) {
        return [1, 2, 3, 0, pageNum]
      }
      if (index >= pageNum - 1) {
        return [1, 0, pageNum - 1, pageNum]
      }
      if (index === 3) {
        return [1, 2, 3, 0, pageNum]
      }
      if (index === pageNum - 2) {
        return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      }
      return [1, 0, index, 0, pageNum]
    }
  },
  watch: {
    '$route.query.page'(value) {
      this.currentPage = value
    }
  },
  methods: {
    changePage(currentPage) {
      this.$emit('change', currentPage)
    },
    jumpPage(pageNumber) {
      if (pageNumber !== 0) {
        const path = this.$route.path || ''
        const query = this.$route.query || {}
        const newQuery = JSON.parse(JSON.stringify(query))
        newQuery.page = pageNumber
        this.$router.push({ path, query: newQuery })
        this.currentPage = pageNumber
      }
    }
  }
}
</script>
