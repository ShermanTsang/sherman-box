<style lang="scss">
  .category-box {
    color: #999;
    padding: 10px 10px 20px 10px;
    border-bottom: 1px solid #ddd;

    &__item {
      display: inline-block;
      letter-spacing: 4px;
      font-size: 1rem;

      &:not(:last-child) {
        margin-right: 24px;
      }
    }

    &__item--active {
      color: #08AEEA;
    }

  }
</style>

<template>
  <div class="category-box" :style="style">
    <nuxt-link :to="$route.path" class="category-box__item">
      全部
    </nuxt-link>
    <nuxt-link v-for="item in categoryCollection" :key="item.id" :to="`${$route.path}?categoryId=${item.id}&page=1`" class="category-box__item" :class="{'category-box__item--active':isActiveCategory(item)}">
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
    categoryCollection() {
      const allCollection = this.$store.getters.categoryCollection || []
      return allCollection.filter((item) => {
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
