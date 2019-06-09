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
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    total: {
      type: String,
      default: ''
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
