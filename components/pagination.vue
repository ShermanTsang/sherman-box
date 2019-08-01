<style lang="scss">
  .pagination {
    margin: 0 auto;
    text-align: center;
    &__item {
      display: inline-block;
      padding: 6px;
      color: #666;
      font-size: 1rem;
      width: 34px;
      border: 1px solid #dddddd;
      margin: 0 6px;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="pagination">
    <div class="pagination__item pagination__item__prev"></div>
    <div v-for="item in pageCount" :key="item" class="pagination__item">
      {{ item }}
    </div>
    <div class="pagination__item pagination__item_next"></div>
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
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.size) || 0
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$emit('change', currentPage)
    }
  }
}
</script>
