<style lang="scss">
  .search {
    &__button {
      cursor: pointer;
    }

    &__main {
      input {
        outline: none;
        color: #999;
        letter-spacing: 2px;
        width: 100%;
        padding: 10px;
        max-width: 100%;
        transition: all .2s ease-in-out;
        background-size: 28px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #ccc;

        &:focus {
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
</style>

<template>
  <div class="search">
    <div class="search__button" @click="status.showModal = true">
      <Icon name="search" color="#999" size="18px"></Icon>
    </div>
    <Modal v-model="status.showModal" title="搜索" icon="search" width="400px">
      <div class="search__main">
        <input
          v-model="form.keyword"
          type="text"
          minlength="2"
          maxlength="15"
          placeholder="找寻记忆..."
          @keyup.enter="search"
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {},
  data () {
    return {
      status: {
        showModal: false
      },
      form: {
        keyword: this.$route.query.keyword
      }
    }
  },
  methods: {
    search () {
      const keyword = this.form.keyword.replace(/\s/g, '')
      if (!keyword || keyword.length === 0) {
        this.$message.error('关键字不能为空')
        return
      }
      this.$router.push({ name: 'search', query: { keyword } })
      if (this.status.showModal) {
        this.status.showModal = false
      }
    }
  }
}
</script>
