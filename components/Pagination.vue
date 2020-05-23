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
    <div v-show="currentPage !== 1 " class="pagination__item pagination__item--action" @click="handleClick(parseInt(currentPage) - 1)">
      <Icon name="angle-left" />
    </div>
    <div
      v-for="item in displayPageList"
      :key="item"
      class="pagination__item"
      :class="{'pagination__item--active': parseInt(currentPage) === parseInt(item) }"
      @click="handleClick(item)"
    >
      <template v-if="item === 0">
        ...
      </template>
      <template v-else>
        {{ item }}
      </template>
    </div>
    <div v-show="currentPage !== totalPageNum" class="pagination__item pagination__item--action" @click="handleClick(parseInt(currentPage) + 1)">
      <Icon name="angle-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    type: {
      type: String,
      default: 'page'
    },
    urlField: {
      type: [String, undefined],
      default: undefined
    },
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
  data () {
    return {
      currentPage: parseInt(this.$route.query[this.type === 'page' ? 'page' : `${this.type}Page`]) || 1
    }
  },
  computed: {
    totalPageNum () {
      return Math.ceil(this.total / this.size) || 0
    },
    displayPageList () {
      const totalPageNum = this.totalPageNum
      const index = this.currentPage
      const arr = []
      if (totalPageNum <= 6) {
        for (let i = 1; i <= totalPageNum; i++) {
          arr.push(i)
        }
        return arr
      }
      if (index <= 2) {
        return [1, 2, 3, 0, totalPageNum]
      }
      if (index >= totalPageNum - 1) {
        return [1, 2, 0, totalPageNum - 1, totalPageNum]
      }
      if (index === 3) {
        return [1, 2, 3, 0, totalPageNum]
      }
      if (index === totalPageNum - 2) {
        return [1, 0, totalPageNum - 2, totalPageNum - 1, totalPageNum]
      }
      return [1, 0, index, 0, totalPageNum]
    }
  },
  watch: {
    '$route.query.page' (value) {
      if (this.type === 'page') {
        this.currentPage = value
      }
    }
  },
  methods: {
    handleClick (currentPage) {
      this.$emit('change', currentPage)
      if (currentPage !== 0) {
        const { path = '', query = {} } = this.$route
        const newQuery = JSON.parse(JSON.stringify(query))
        newQuery[this.type === 'page' ? 'page' : `${this.type}Page`] = currentPage
        this.$router.push({ path, query: newQuery })
      }
      this.currentPage = currentPage
    }
  }
}
</script>
