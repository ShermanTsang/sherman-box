<style lang="scss">
  .blog {
    &__header {
      position: relative;
      width: 100%;
      height: 400px;
      overflow: hidden;

      &__image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: .8;
        transform: scale(1.3);
        filter: blur(4px);
        width: 100%;
        height: 100%;
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
        box-shadow: 0 -30px 20px 40px rgb(255, 255, 255) inset;
      }

      &__text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: center;
        color: #fff;
        cursor: default;
        padding: 0 20px;
        text-shadow: 0 0 2px rgba(0, 0, 0, .8);

        &__title {
          padding: 8px 10px;
          background-color: rgba(0, 0, 0, .4);
          letter-spacing: 2px;
          line-height: 1.6;
          font-size: 1.3rem;
        }

        &__info {
          padding: 8px 10px;
          background-color: rgba(0, 0, 0, .35);
          max-width: 600px;
          letter-spacing: 1px;
          font-size: .9rem;
        }
      }
    }
  }
</style>

<template>
  <div class="blog">
    <div class="blog__header">
      <div v-lazy:background-image="$getOssUrl(data.blogItem.image)" class="blog__header__image">
      </div>
      <layout-container class="blog__header__text">
        <div class="blog__header__text__title">
          {{ data.blogItem.name }}
        </div>
        <Blocker height="20px" />
        <div class="blog__header__text__info">
          <Icon name="category" />
          {{ data.blogItem.category.name }}
          <Icon name="clock" />
          <Moment format="YYYY-MM-DD" :time="data.blogItem.datetime" from-now />
        </div>
      </layout-container>
    </div>
    <Blocker height="20px" />
    <layout-container class="blog__content">
      <Markdown :content="data.blogItem.content" />
    </layout-container>
    <Blocker height="60px" />
    <layout-container>
      <Comment :id="data.blogItem.id" module="blog" :source-data="data.blogItem.comments" />
    </layout-container>
    <Blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    const { name, category, description } = this.data.blogItem
    return {
      title: `${name} - ${category.name} - 博文`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${description || ''}`)
        }
      ]
    }
  },
  async asyncData({ $axios, store, params }) {
    const { data: blogItem } = await $axios.$get(`/api/blogs/${params.id}`)
    store.commit('currentItem', blogItem)
    return {
      data: {
        blogItem
      }
    }
  }
}
</script>
