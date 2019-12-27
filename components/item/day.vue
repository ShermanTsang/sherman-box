<style lang="scss">
  .day-item {
    position: relative;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    overflow: hidden;
    height: 400px;
    cursor: pointer;

    &__image {
      transform: scale(1.4);
      z-index: $z-index-card-background;
      transition: all 200ms ease-in;
      opacity: .8;
      height: 210px;
      background-position: center;
      background-size: cover;
      box-shadow: 0 -10px 20px 16px #fff inset;
    }

    &__main {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: $z-index-card-content;
      padding: 16px 32px;

      &__date {
        display: inline-block;
        padding-bottom: 10px;
        cursor: pointer;
        color: #fff;
        text-shadow: 2px 1px 6px rgba(0,0,0,.2);

        &__main {
          font-size: 1.85rem;
          font-weight: bold;
          letter-spacing: 2px;
        }

        &__sub {
          font-size: 1.1rem;
        }

      }

      &__date--withoutImage{
        color: #999;
        text-shadow: none;
      }

      &__info {
        color: #999999;
        font-size: .9rem;
        margin-top: 100px;

        &__detail {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;

          &__item {
            border: 1px solid #eee;
            padding: 2px 10px;
            border-radius: 4px;
            cursor: default;
            font-size: .95rem;
            margin: 4px;

            i {
              font-size: 1.25rem;
              color: #ccc;
            }

            small {
              font-size: .85rem;
            }

          }
        }
      }
    }

    &:hover {
      .day-item__image {
        opacity: 1;
      }
    }

    @media ($screen-xs-max) {
      flex-flow: column nowrap;

      &__main {
        height: auto;
        padding: 16px;
        order: 2;

        &__info {
          font-size: .85rem;
        }
      }

    }

  }
</style>

<template>
  <Card
    @click.native="$router.push(`/day/${ $time(item.date).format('YYYY-MM-DD') }`)"
    class="day-list__item day-item"
  >
    <div
      v-if="item.image"
      v-lazy:background-image="$getOssUrl(item.image)"
      class="day-item__image"
    ></div>
    <div class="day-item__main">
      <div :class="{'day-item__main__date--withoutImage': !item.image}" @click="$router.push(`/day/${ $time(item.date).format('YYYY-MM-DD') }`)" class="day-item__main__date">
        <div class="day-item__main__date__main">
          {{ $time(item.date).format('MM.DD') }}
        </div>
        <div class="day-item__main__date__sub">
          {{ $time(item.date).format('YYYY dddd') }}
        </div>
      </div>
      <div class="day-item__main__info">
        <div class="day-item__main__info__detail">
          <div v-if="item.event" class="day-item__main__info__detail__item">
            <icon name="calendar" />
            {{ $getStringCount(item.event) }} <small>件</small>
          </div>
          <div v-if="item.step" class="day-item__main__info__detail__item">
            <icon name="run" />
            {{ item.step }} <small>步</small>
          </div>
          <div v-if="item.weight" class="day-item__main__info__detail__item">
            <icon name="weight" />
            {{ item.weight }} <small>斤</small>
          </div>
          <div v-if="item.movement" class="day-item__main__info__detail__item">
            <icon name="schedule" />
            {{ $getStringCount(item.movement) }} <small>项</small>
          </div>
          <div v-if="item.people" class="day-item__main__info__detail__item">
            <icon name="user" />
            {{ $getStringCount(item.people) }} <small>人</small>
          </div>
          <div v-if="item.food" class="day-item__main__info__detail__item">
            <icon name="food" />
            {{ $getStringCount(item.food) }} <small>类</small>
          </div>
          <div v-if="item.location" class="day-item__main__info__detail__item">
            <icon name="location" />
            {{ $getStringCount(item.location) }} <small>处</small>
          </div>
          <div v-if="item.mood" class="day-item__main__info__detail__item">
            <icon name="mood" />
            {{ $getStringCount(item.mood) }} <small>种</small>
          </div>
        </div>
      </div>
    </div>
  </Card>
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
