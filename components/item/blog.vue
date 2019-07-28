<style lang="scss">
  .blog-item {
    height: 400px;
    position: relative;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    font-size: 1rem;

    &__image {
      cursor: pointer;
      height: 240px;
      background-position: center center;
      background-size: cover;
      transition: all 200ms ease-in;
      opacity: .8;
      transform: scale(1.3);
      box-shadow: 0 -20px 20px 40px rgb(255, 255, 255) inset;
    }

    &__main {
      position: absolute;
      top: 190px;
      left: 0;
      right: 0;
      margin-top: 20px;
      padding: 20px;

      &__title {
        display: inline-block;
        font-size: 1.2rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        border-bottom: 2px solid #efefef;
      }

      &__description {
        color: #999999;
        margin-top: 10px;
        line-height: 2;
        font-size: .95rem;
        overflow: hidden;
      }
    }

    &:hover {
      .blog-item__image {
        opacity: 1;
      }
    }

  }
</style>

<template>
  <card
    class="blog-list__item blog-item"
  >
    <nuxt-link :to="`/blog/${item.id}`">
      <div v-lazy:background-image="$getOssUrl(item.image)" :to="`/blog/${item.id}`" class="blog-item__image">
      </div>
      <div class="blog-item__main">
        <div class="blog-item__main__title">
          <nuxt-link :to="`/blog/${item.id}`">
            {{ item.name }}
          </nuxt-link>
        </div>
        <div class="blog-item__main__description">
          <template v-if="item.description">
            {{ item.description.length > 40 ? `${item.description.substring(0,40)}...` : item.description }}
          </template>
          <blocker height="6px" />
          <clock format="YYYY-MM-DD" from-now>
            {{ item.datetime }}
          </clock>
        </div>
      </div>
    </nuxt-link>
  </card>
</template>

<script>
export default {
  name: 'ItemBlog',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
