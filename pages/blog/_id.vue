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
        z-index: 1;
        opacity: .8;
        transform: scale(1.2);
        filter: blur(4px);
        width: 100%;
        height: 100%;
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
        box-shadow: 0 -20px 20px 40px rgb(255, 255, 255) inset;
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
        text-shadow: 0 0 8px rgba(0,0,0,.8);

        &__title {
          letter-spacing: 2px;
          font-size: 1.6rem;
        }

        &__info {
          max-width: 600px;
          letter-spacing: 1px;
          font-size: 1rem;
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
      <container :max-width="1060" class="blog__header__text">
        <div class="blog__header__text__title">
          {{ data.blogItem.name }}
        </div>
        <blocker height="20px" />
        <div class="blog__header__text__info">
          <icon name="clock" />
          <clock format="YYYY-MM-DD" from-now>
            {{ data.blogItem.datetime }}
          </clock>
        </div>
      </container>
    </div>
    <blocker height="20px" />
    <container class="blog__content" :max-width="1060">
      <markdown :content="data.blogItem.content" />
    </container>
    <blocker height="60px" />
    <container :max-width="1060">
      <comment :data="data.blogItem.comments" />
    </container>
    <blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title: this.$getSeoInfo('title', `${this.data.blogItem.name} - ${this.data.blogItem.category.name} - 博文`),
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', `${this.data.blogItem.description || ''}`) }
      ]
    }
  },
  async asyncData({ $axios, params }) {
    const { data: blogItem } = await $axios.$get(`/api/blogs/${params.id}`)
    return {
      data: {
        blogItem
      }
    }
  }
}
</script>
