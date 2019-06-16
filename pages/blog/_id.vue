<style lang="scss">
  .blog {
    &__header {
      position: relative;
      width: 100%;
      height: 300px;
      overflow: hidden;

      &__image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        img {
          opacity: .5;
          transform: scale(1.15);
          filter: blur(6px);
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
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
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: default;
        padding: 0 20px;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);

        &__title {
          letter-spacing: 2px;
          font-size: 1.6rem;
          padding: 10px;
          background-color: rgba(0, 0, 0, .4);
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
      <div class="blog__header__image">
        <img v-lazy="$getOssUrl(data.blogItem.image)">
      </div>
      <div class="blog__header__text">
        <div class="blog__header__text__title">
          {{ data.blogItem.name }}
        </div>
        <blocker height="20px" />
        <div class="blog__header__text__info">
          <icon name="clock" /> {{ $time(data.blogItem.datetime).format('YYYY-MM-DD') }} / {{ $time(data.blogItem.datetime).fromNow() }}
        </div>
      </div>
    </div>
    <blocker height="60px" />
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
