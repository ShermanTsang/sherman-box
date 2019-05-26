<style lang="scss">
  .blog {
    &__header {
      position: relative;
      width: 100%;
      height: 300px;
      overflow: hidden;
      &__image{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        img{
          transform: scale(1.15);
          filter: blur(10px);
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &__title {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        text-shadow: 0 0 10px rgba(0,0,0,.5);
        cursor: default;
        padding: 0 20px;
        letter-spacing: 2px;
      }
    }

  }
</style>

<template>
  <div class="blog">
    <div class="blog__header">
      <div class="blog__header__image">
        <img :src="$getImageUrl(data.blogItem.image)">
      </div>
      <div class="blog__header__title">
        {{ data.blogItem.title }}
      </div>
    </div>
    <blocker :height="60" />
    <container class="blog__content" :max-width="960">
      <markdown :content="data.blogItem.content" />
    </container>
    <blocker :height="60" />
    <container :max-width="960">
      <comment :data="data.blogItem.comments" />
    </container>
    <blocker :height="60" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/api/blogs/${params.id}`)
    return {
      data: {
        blogItem: data.blogItem
      }
    }
  }
}
</script>
