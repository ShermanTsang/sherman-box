<style lang="scss">
  .plan-item {
    height: 300px;
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
      transform: scale(1.3);
      box-shadow: 0 -20px 20px 40px rgb(255, 255, 255) inset;
    }

    &__main {
      position: absolute;
      top: 110px;
      left: 0;
      right: 0;
      padding: 20px;

      &__title {
        display: inline-block;
        font-size: 1.2rem;
        letter-spacing: 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 10px;
        background-color: rgba(0,0,0,.2);
        color: #ffffff;
      }

      &__info {
        color: #999999;
        margin-top: 30px;
        line-height: 2;
        font-size: .95rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    &:hover {
    }

  }
</style>

<template>
  <card
    class="plan-list__item plan-item"
  >
    <nuxt-link :to="`/plan/${item.id}`">
      <div v-lazy:background-image="$getOssUrl(item.image)" :to="`/plan/${item.id}`" class="plan-item__image">
      </div>
      <div class="plan-item__main">
        <div class="plan-item__main__title" @click="$router.push(`/plan/${item.id}`)">
          <small>{{ item.category.name }}</small> / {{ item.name }}
        </div>
        <div class="plan-item__main__info">
          <moment format="YYYY-MM-DD" from-now :time="item.datetime_start" />
          ~
          <moment format="YYYY-MM-DD" from-now :time="item.datetime_end" />
          <br>
          <template v-if="item.description">
            {{ item.description.length > 40 ? `${item.description.substring(0,40)}...` : item.description }}
          </template>
        </div>
      </div>
    </nuxt-link>
  </card>
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
