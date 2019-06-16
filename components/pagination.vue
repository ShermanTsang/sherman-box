<style lang="scss">
  .pagination {
    margin: 0 auto;
    text-align: center;
  }
</style>

<template>
  <div class="pagination">
    <a-pagination v-model="page" :total="total" :page-size="size" @change="changePage" />
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
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$emit('change', currentPage)
    }
  }
}
</script>
