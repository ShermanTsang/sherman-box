<style lang="scss">
  .category-box {
    color: #999;
    display: -webkit-box;
    overflow-x: scroll;
    overflow-scrolling: touch;
    white-space: nowrap;

    &:not(:first-child) {
      margin-left: 10px;
    }

    &__item {
      position: relative;
      display: inline-block;
      letter-spacing: 2px;
      font-size: 1rem;
      padding: 6px 16px;

      &:not(:last-child) {
        margin-right: 24px;
      }
    }

    &__item--active {
      color: $theme-color;
      border-radius: 1px;
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }

  }
</style>

<template>
  <div :style="style" class="category-box">
    <nuxt-link
      :to="$route.path"
      :class="{'category-box__item--active': !$route.query.categoryId}"
      class="category-box__item"
    >
      全部
    </nuxt-link>
    <nuxt-link
      v-for="item in categoryList"
      :key="item.id"
      :to="`${$route.path}?categoryId=${item.id}&page=1`"
      :class="{'category-box__item--active':isActiveCategory(item)}"
      class="category-box__item"
    >
      {{ item.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'CategoryBox',
  props: {
    module: {
      type: String,
      default: ''
    }
  },
  computed: {
    categoryList() {
      const allList = this.$store.getters.categoryList || []
      return allList.filter((item) => {
        return item.module === this.module
      })
    },
    style() {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  methods: {
    isActiveCategory(categoryItem) {
      const { id } = categoryItem
      return parseInt(this.$route.query.categoryId) === parseInt(id)
    }
  }
}
</script>
