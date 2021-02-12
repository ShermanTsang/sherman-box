<style lang="scss">
$prefix: 'search';

.#{$prefix} {
    &__button {
      cursor: pointer;
    }

    &__main {
      &__input {
        outline: none;
        color: #999;
        letter-spacing: 2px;
        width: 100%;
        padding: 10px;
        max-width: 100%;
        line-height: 24px;
        transition: all .2s ease-in-out;
        background-size: 28px;
        font-size: 1.4rem;
        border: none;
        text-align: center;

        &:focus {
          background-color: rgba(177,177,177,.1);
        }
      }
    }
  }
</style>

<template>
  <div class="search">
    <slot>
      <div class="search__button" @click="state.showModal = true">
        <Icon name="search" color="#999" size="18px"></Icon>
      </div>
    </slot>
    <Modal v-model="state.showModal" title="搜索" icon="search" width="800px">
      <div class="search__main">
        <input
          v-model="form.keyword"
          class="search__main__input"
          type="text"
          minlength="2"
          maxlength="15"
          placeholder="请输入关键字..."
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
      state: {
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
      if (this.state.showModal) {
        this.state.showModal = false
      }
    }
  }
}
</script>
