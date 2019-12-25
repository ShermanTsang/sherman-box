<style lang="scss">
  .search {
    input {
      outline: none;
      color: #999;
      letter-spacing: 2px;
      width: 120px;
      padding: 10px 16px 10px 40px;
      max-width: 100%;
      transition: all .2s ease-in-out;
      background: #fff url('../assets/image/search.png') 8px 5px no-repeat;
      background-size: 28px;
      border: none;

      &:focus{
        border-bottom: 1px solid #ddd;
      }

      @media ($screen-sm-min) {
        &:focus {
          color: #666;
          width: 240px;
          box-shadow: rgba(177, 177, 177, 0.1) 0 0 10px inset;
        }
      }
    }
  }
</style>

<template>
  <div class="search">
    <input
      v-model="form.keyword"
      @keyup.enter="search"
      type="text"
      minlength="2"
      maxlength="15"
      placeholder="搜索..."
    >
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {},
  data() {
    return {
      form: {
        keyword: this.$route.query.keyword
      }
    }
  },
  methods: {
    search() {
      const keyword = this.form.keyword.replace(/\s/g, '')
      if (!keyword || keyword.length === 0) {
        this.$message.error('关键字不能为空')
        return
      }
      this.$router.push({ name: 'search', query: { keyword } })
    }
  }
}
</script>
