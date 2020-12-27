<style lang="scss">
.category-box {
  position: relative;
  color: #999;
  margin: 16px 0;

  &__content {
    display: -webkit-box;
    overflow-x: scroll;
    overflow-scrolling: touch;
    white-space: nowrap;

    &__item {
      position: relative;
      display: inline-block;
      letter-spacing: 2px;
      font-size: 1rem;
      padding: 0 16px;

      &:not(:last-child) {
        margin-right: 24px;
      }
    }

    &__item--active {
      color: $theme-color;

      &:before {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $theme-color;
        height: 12px;
        content: '';
        opacity: 0.2;
      }
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }

  }

  &__scrollbar {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    width: 20px;
    background-color: #fff;
    box-shadow: 0 -20px 20px 30px rgb(255, 255, 255);
    cursor: pointer;

    &:hover {
      width: 40px;
    }
  }

  &__scrollbar--left {
    left: 0;
    text-align: left;
  }

  &__scrollbar--right {
    right: 0;
    text-align: right;
  }

}
</style>

<template>
  <div class="category-box">
    <div id="categoryBox" ref="categoryBox" class="category-box__content" @scroll="checkScrollbarStatus()">
      <nuxt-link
        :to="$route.path"
        :class="{'category-box__content__item--active': !$route.query.categoryId}"
        class="category-box__content__item"
      >
        全部
      </nuxt-link>
      <nuxt-link
        v-for="item in data.categoryList"
        :key="item.id"
        :to="`${$route.path}?categoryId=${item.id}&page=1`"
        :class="{'category-box__content__item--active':isActiveCategory(item.id)}"
        class="category-box__content__item"
      >
        {{ item.name }}
      </nuxt-link>
    </div>
    <div
      v-show="state.showLeftScrollbar"
      class="category-box__scrollbar category-box__scrollbar--left"
      @click="scrollCategoryBox('left')"
    >
      <Icon name="angle-left" color="#aaa" size="18px" />
    </div>
    <div
      v-show="state.showRightScrollbar"
      class="category-box__scrollbar category-box__scrollbar--right"
      @click="scrollCategoryBox('right')"
    >
      <Icon name="angle-right" color="#aaa" size="18px" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryBox',
  props: {
    module: {
      type: String,
      default: ''
    },
    withItems: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      state: {
        showRightScrollbar: false,
        showLeftScrollbar: false
      },
      data: {
        categoryList: []
      }
    }
  },
  watch: {
    'data.categoryList' () {
      this.checkScrollbarStatus()
    }
  },
  mounted () {
    this.requestCategoryList()
    window.onresize = () => {
      this.checkScrollbarStatus()
    }
  },
  destroyed () {
    window.onresize = null
  },
  methods: {
    isActiveCategory (categoryId) {
      return parseInt(this.$route.query.categoryId) === parseInt(categoryId)
    },
    scrollCategoryBox (orientation = 'right') {
      const categoryBox = this.$refs.categoryBox
      const scrollLeft = categoryBox.scrollLeft
      categoryBox.scrollLeft = orientation === 'right' ? (scrollLeft + 40) : (scrollLeft - 40)
    },
    checkScrollbarStatus () {
      setTimeout(() => {
        const categoryBox = this.$refs.categoryBox
        const { parentNode, scrollWidth, scrollLeft } = categoryBox
        this.state.showRightScrollbar = scrollWidth > parentNode.scrollWidth
        this.state.showLeftScrollbar = scrollLeft > 0
      }, 0)
    },
    async requestCategoryList () {
      const { data: categoryList } = await this.$axios.$get('/api/categories', {
        params: {
          module: this.module,
          withItems: this.withItems,
          sortBy: 'order',
          order: 'asc'
        }
      })
      this.data.categoryList = categoryList
    }
  }
}
</script>
