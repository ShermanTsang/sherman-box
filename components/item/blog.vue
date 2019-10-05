<style lang="scss">
  .blog-item {
    display: flex;
    flex-flow: row nowrap;
    height: 200px;
    overflow: hidden;

    &__image {
      flex: 0 0 30%;
      height: 100%;
      width: 30%;
      cursor: pointer;
      background-position: center center;
      background-size: cover;
      transition: all 200ms ease-in;
    }

    &__main {
      flex: 1 0;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
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
        color: #666;
        cursor: pointer;
      }

      &__description {
        color: #999999;
        line-height: 2;
        font-size: .95rem;
        overflow: hidden;
      }

    }

    &:nth-child(2n) {
      .blog-item {
        &__image {
          order: 1;
        }
      }
    }

    @media ($screen-xs-max) {
      height: auto;
      flex-flow: column nowrap;

      &__image {
        width: 100%;
        height: 200px;
        flex: 0 0 200px;
        order: 0 !important;
      }

    }

  }
</style>

<template>
  <Card
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
        <Moment format="YYYY-MM-DD" from-now :time="item.datetime" color="#999" />
      </div>
      <div class="blog-item__main__title" @click="$router.push(`/blog/${item.id}`)">
        {{ item.name }}
      </div>
      <Blocker height="10px" divider />
      <div class="blog-item__main__description">
        # {{ item.category.name }}
        <template v-if="item.description">
          {{ item.description.length > 100 ? `${item.description.substring(0,100)}...` : item.description }}
        </template>
      </div>
    </div>
  </Card>
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
