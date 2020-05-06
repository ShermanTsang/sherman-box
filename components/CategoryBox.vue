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
        v-for="item in categoryList"
        :key="item.id"
        :to="`${$route.path}?categoryId=${item.id}&page=1`"
        :class="{'category-box__content__item--active':isActiveCategory(item.id)}"
        class="category-box__content__item"
      >
        {{ item.name }}
      </nuxt-link>
    </div>
    <div v-show="status.showLeftScrollbar" class="category-box__scrollbar category-box__scrollbar--left" @click="scrollCategoryBox()">
      <Icon name="angle-left" color="#aaa" size="18px" />
    </div>
    <div v-show="status.showRightScrollbar" class="category-box__scrollbar category-box__scrollbar--right" @click="scrollCategoryBox()">
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
    }
  },
  data () {
    return {
      status: {
        showRightScrollbar: false,
        showLeftScrollbar: false
      }
    }
  },
  computed: {
    categoryList () {
      const allList = this.$store.getters.categoryList || []
      return allList.filter((item) => {
        return item.module === this.module
      })
    }
  },
  mounted () {
    this.checkScrollbarStatus()
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
    scrollCategoryBox () {
      const categoryBox = this.$refs.categoryBox
      const scrollLeft = categoryBox.scrollLeft
      categoryBox.scrollLeft = scrollLeft + 40
    },
    checkScrollbarStatus () {
      const categoryBox = this.$refs.categoryBox
      const { parentNode, scrollWidth, scrollLeft } = categoryBox
      this.status.showRightScrollbar = scrollWidth > parentNode.scrollWidth
      this.status.showLeftScrollbar = scrollLeft > 0
    }
  }
}
</script>
