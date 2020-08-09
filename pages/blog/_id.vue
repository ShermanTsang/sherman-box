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
      }

      &__text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
          letter-spacing: 2px;
          line-height: 1.4;
          font-size: 1.3rem;
        }

        &__info {
          max-width: 600px;
          letter-spacing: 1px;
          font-size: .95rem;

          &__item {
            padding: 8px 10px;
          }
        }
      }

      &__text--withoutImage {
        text-shadow: none;
        color: #666;
      }
    }

  }
</style>

<template>
  <div class="blog">
    <div class="blog__header">
      <div v-if="data.blogItem.image" v-lazy:background-image="$getOssUrl(data.blogItem.image)" class="blog__header__image">
      </div>
      <LayoutContainer class="blog__header__text" :class="{'blog__header__text--withoutImage': !data.blogItem.image}">
        <div class="blog__header__text__title">
          {{ data.blogItem.name }}
        </div>
        <Blocker height="20px" />
        <div class="blog__header__text__info">
          <div class="blog__header__text__info__item">
            <Icon name="category" />
            {{ data.blogItem.category ? data.blogItem.category.name : '待分类' }}
          </div>
          <div v-if="data.blogItem.lark_doc" class="blog__header__text__info__item">
            <Icon name="clock" />
            <Datetime :time="data.blogItem.lark_doc.created_at" type="date" />创建,<Datetime :time="data.blogItem.lark_doc.updated_at" type="datetime" />更新
          </div>
          <div v-else class="blog__header__text__info__item">
            <Icon name="clock" />
            <Datetime :time="data.blogItem.created_at" type="date" />创建,<Datetime :time="data.blogItem.updated_at" type="datetime" />更新
          </div>
          <div v-if="data.blogItem.lark_doc" class="blog__header__text__info__item">
            <Icon name="lark" /> 文档同步自语雀
          </div>
        </div>
      </LayoutContainer>
    </div>
    <Blocker height="40px" />
    <LayoutContainer class="blog__content">
      <HtmlContent v-if="data.blogItem.lark_doc" :content="data.blogItem.lark_doc.content_html" />
      <Markdown v-else :content="data.blogItem.content" />
    </LayoutContainer>
    <Blocker height="60px" />
    <LayoutContainer>
      <Comment :id="data.blogItem.id" module="blog" />
    </LayoutContainer>
    <Blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, store, params }) {
    const { data: blogItem } = await $axios.$get(`/api/blogs/${params.id}`)
    store.commit('SET_CURRENT_ITEM', { image: blogItem.image, name: blogItem.name, category: blogItem.category, date: blogItem.date })
    return {
      data: {
        blogItem
      }
    }
  },
  head () {
    const { name, category, description } = this.data.blogItem
    return {
      title: `${name} - ${category ? category.name : '待分类'} - 博文`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${description || ''}`)
        }
      ]
    }
  }
}
</script>
