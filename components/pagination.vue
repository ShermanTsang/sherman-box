<style lang="scss">
  .pagination {
    margin: 0 auto;
    text-align: center;

    &__item {
      display: inline-block;
      padding: 6px 4px;
      color: #999;
      font-size: 1rem;
      width: 40px;
      margin: 0 2px;
      cursor: pointer;
      border-radius: 2px;
    }

    &__item--active {
      border-color: #08AEEA;
      color: #08AEEA;
      border-bottom: 2px solid #08AEEA;
    }

    &__item--action {
      color: #999;
    }

  }
</style>

<template>
  <div class="pagination">
    <div class="pagination__item pagination__item--action" @click="jumpPage(currentPage - 1)">
      <icon name="angle-left" />
    </div>
    <div
      v-for="item in displayPageList"
      :key="item"
      class="pagination__item"
      :class="{'pagination__item--active': currentPage === item}"
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
      <icon name="angle-right" />
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
      currentPath: this.$route.path || '',
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
        return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      }
      if (index === 3) {
        return [1, 2, 3, 4, 0, pageNum]
      }
      if (index === pageNum - 2) {
        return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      }
      return [1, 0, index - 1, index, index + 1, 0, pageNum]
    }
  },
  methods: {
    changePage(currentPage) {
      this.$emit('change', currentPage)
    },
    jumpPage(pageNumber) {
      if (pageNumber !== 0) {
        this.$router.push(`${this.currentPath}?page=${pageNumber}`)
        this.currentPage = pageNumber
      }
    }
  }
}
</script>
