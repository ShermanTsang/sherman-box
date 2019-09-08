<style lang="scss">
  .blog-item {
    display: flex;
    flex-flow: row nowrap;

    &__image {
      flex: 0 0 30%;
      height: 260px;
      cursor: pointer;
      background-position: center center;
      background-size: cover;
      transition: all 200ms ease-in;
      order: 1;
    }

    &__main {
      flex: 1 0;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      position: relative;
      overflow: hidden;
      transition-duration: 0.2s;
      line-height: 1.5;
      text-overflow: ellipsis;
      letter-spacing: 1px;
      font-size: 1rem;
      left: 0;
      right: 0;
      padding: 32px;

      &__title {
        font-size: 1.2rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &__name {
        a {
          color: #999;
        }
      }

      &__description {
        color: #999999;
        line-height: 2;
        font-size: .95rem;
        overflow: hidden;
      }

    }

  }
</style>

<template>
  <card
    class="blog-list__item blog-item"
  >
    <div
      v-lazy:background-image="$getOssUrl(item.image)"
      :to="`/blog/${item.id}`"
      class="blog-item__image"
      @click="$router.push(`/blog/${item.id}`)"
    >
    </div>
    <div class="blog-item__main">
      <div class="blog-item__main__time">
        <moment format="YYYY-MM-DD" from-now :time="item.datetime" />
      </div>
      <div class="blog-item__main__title">
        <nuxt-link :to="`/blog/${item.id}`">
          {{ item.name }}
        </nuxt-link>
      </div>
      <Blocker height="10px" divider />
      <div class="blog-item__main__description">
        # {{ item.category.name }}
        <template v-if="item.description">
          {{ item.description.length > 100 ? `${item.description.substring(0,100)}...` : item.description }}
        </template>
      </div>
    </div>
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
