<style lang="scss">
  .plan-item {
    position: relative;
    overflow: hidden;
    transition-duration: 0.2s;
    letter-spacing: 1px;

    &__image {
      position: relative;
      cursor: pointer;
      height: 240px;
      background-position: center center;
      background-size: cover;
      transition: all 200ms ease-in;

      &__overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: $z-index-card-background;
        background: rgba(0, 0, 0, .2);
      }

      &__text {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: $z-index-card-content;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #ffffff;
        text-shadow: 0 0 4px rgba(0,0,0,.2);

        &__title {
          letter-spacing: 2px;
          font-size: 1.2rem;
          padding-bottom: 16px;
          border-bottom: 4px solid $theme-color;
        }

        &__description {
          margin-top: 16px;
          letter-spacing: 1px;
          font-size: .9rem;
          color: #efefef;
        }
      }

    }

    &__info {
      padding: 16px;
      color: #999999;
      line-height: 1.5;
      font-size: .95rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

  }
</style>

<template>
  <Card
    class="plan-list__item plan-item"
  >
    <div
      v-lazy:background-image="$getOssUrl(item.image)"
      :to="`/plan/${item.id}`"
      @click="$router.push(`/plan/${item.id}`)"
      class="plan-item__image"
    >
      <div class="plan-item__image__overlay"></div>
      <div class="plan-item__image__text">
        <div class="plan-item__image__text__title">
          <small>{{ item.category.name }}</small> / {{ item.name }}
        </div>
        <template v-if="item.description">
          <div class="plan-item__image__text__description">
            {{ item.description.length > 40 ? `${item.description.substring(0,40)}...` : item.description }}
          </div>
        </template>
      </div>
    </div>
    <div class="plan-item__info">
      <Datetime :time="item.datetime_start" format="YYYY-MM-DD" from-now />
      ~
      <Datetime :time="item.datetime_end" v-if="item.datetime_end" format="YYYY-MM-DD" from-now />
      <template v-else>
        至今
      </template>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ItemPlan',
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
