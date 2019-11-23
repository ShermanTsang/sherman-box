<style lang="scss">
  .project-item {
    position: relative;
    overflow: hidden;

    &__overlay {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: $z-index-card-background;
      background-image: linear-gradient(hsla(0, 0%, 20%, 0), hsla(0, 0%, 20%, .4));
    }

    &__text {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      padding: 20px;
      color: #ffffff;
      z-index: $z-index-card-content;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
      word-wrap: break-word;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0, transparent 100%);

      span {
        letter-spacing: 2px;
        line-height: 1.8;
        background: rgba(0, 0, 0, .2);
        display: inline;
        padding: 4px 10px;
        transition: all 0.3s ease-in-out;
      }
    }

    &__image {
      overflow: hidden;
      height: 340px;
      transition: all .3s ease-in-out;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

    }

    &:hover {
      .project-item {
        &__image {
          transform: scale(1.02);
        }

        &__text {
          span{
            background: rgba(0, 0, 0, .5);
          }
        }
      }
    }

    &--disable {
      pointer-events: none;
      cursor: default;
      opacity: 0.6;
      filter: grayscale(1);
    }
  }
</style>

<template>
  <Card
    class="project-list__item project-item"
  >
    <nuxt-link :to="`/project/${item.id}`">
      <div class="project-item__image">
        <img v-lazy="$getOssUrl(item.image)">
      </div>
      <div class="project-item__overlay"></div>
      <div class="project-item__text">
        <span style="font-size: .95rem;">
          {{ item.category.name }} / {{ item.type }}
        </span>
        <Blocker height="4px" />
        <span style="font-size: 1.2rem;">
          {{ item.name }}
        </span>
        <Blocker height="6px" />
        <span style="font-size: .85rem;">
          {{ item.status }}{{ item.progress !== 100 ? `（${item.progress}%）` : '' }}  · {{ $time(item.datetime_start).format('YYYY-MM-DD') }} {{ $time(item.datetime_start).fromNow() }}
        </span>
      </div>
    </nuxt-link>
  </Card>
</template>

<script>
export default {
  name: 'ItemProject',
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
