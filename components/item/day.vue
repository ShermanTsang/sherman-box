<style lang="scss">
  .day-item {
    position: relative;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    font-size: 1rem;
    display: flex;
    flex-flow: row nowrap;

    &__main {
      flex: 0 0 60%;
      padding: 32px;
      height: 260px;

      &__name {
        display: inline-block;
        font-size: 1rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        border-bottom: 2px solid #efefef;

        small {
          color: #999;
        }
      }

      &__info {
        color: #999999;
        font-size: .9rem;
        margin-top: 10px;
        overflow: hidden;

        &__detail {

          &__item {
            display: inline-flex;
            width: 30%;
            flex-flow: row nowrap;
            align-items: center;
            cursor: default;
            font-size: .95rem;
            margin: 6px 0;
            justify-content: left;

            i {
              font-size: 1rem;
              margin-right: 6px;
              color: #ccc;
            }

          }
        }
      }
    }

    &__image {
      flex: 0 0 40%;
      transform: translateX(10px);
      position: absolute;
      right: 0;
      top: 0;
      width: 300px;
      height: 100%;
      background-position: center center;
      background-size: cover;
      -webkit-transition: all 200ms ease-in;
      transition: all 200ms ease-in;
      opacity: .5;

      &:after {
        content: '';
        position: absolute;
        top: -10px;
        bottom: 0;
        left: -2px;
        width: 0;
        height: 0;
        border-top: 280px solid transparent;
        border-left: 50px solid #fff;
      }
    }

    &:hover {
      .day-item__image {
        opacity: 1;
        transform: none;
      }
    }

    @media ($screen-xs) {
      flex-flow: column nowrap;

      &__main {
        height: auto;
        padding: 16px;
        order: 2;

        &__info {
          font-size: .85rem;
        }
      }

      &__image {
        position: relative;
        width: 100%;
        height: 100px;
        opacity: 1;
        transform: none;
        order: -1;
        background-attachment: fixed;

        &:after {
          display: none;
        }
      }
    }

  }
</style>

<template>
  <card
    class="day-list__item day-item"
  >
    <div class="day-item__main">
      <div class="day-item__main__name">
        <nuxt-link :to="`/day/${ $time(item.date).format('YYYY-MM-DD') }`">
          {{ $time(item.date).format('YYYY年MM月DD日') }} {{ $time(item.date).format('dddd') }}
          <br>
          <small>{{ $time(item.date).format('YY') }}年的第{{ $time(item.date).format('DDD') }}天（{{
            Math.ceil($time(item.date).format('DDD')/365*100) }}%）</small>
        </nuxt-link>
      </div>
      <div class="day-item__main__info">
        <div class="day-item__main__info__detail">
          <div v-if="item.event" class="day-item__main__info__detail__item">
            <icon name="calendar" />
            {{ $getStringCount(item.event) }}件
          </div>
          <div v-if="item.step" class="day-item__main__info__detail__item">
            <icon name="run" />
            {{ item.step }}步
          </div>
          <div v-if="item.weight" class="day-item__main__info__detail__item">
            <icon name="weight" />
            {{ item.weight }}斤
          </div>
          <div v-if="item.movement" class="day-item__main__info__detail__item">
            <icon name="schedule" />
            {{ $getStringCount(item.movement) }}项
          </div>
          <div v-if="item.people" class="day-item__main__info__detail__item">
            <icon name="user" />
            {{ $getStringCount(item.people) }}人
          </div>
          <div v-if="item.food" class="day-item__main__info__detail__item">
            <icon name="food" />
            {{ $getStringCount(item.food) }}类
          </div>
          <div v-if="item.location" class="day-item__main__info__detail__item">
            <icon name="location" />
            {{ $getStringCount(item.location) }}处
          </div>
          <div v-if="item.mood" class="day-item__main__info__detail__item">
            <icon name="mood" />
            {{ $getStringCount(item.mood) }}种
          </div>
        </div>
      </div>
    </div>
    <nuxt-link :to="`/day/${ $time(item.date).format('YYYY-MM-DD') }`">
      <div v-if="item.image" v-lazy:background-image="$getOssUrl(item.image)" class="day-item__image">
      </div>
    </nuxt-link>
  </card>
</template>

<script>
export default {
  name: 'ItemDay',
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
