<style lang="scss">
  .day-item {
    transition-duration: 0.2s;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    overflow: hidden;
    cursor: pointer;

    &__header {
      position: relative;
      height: 220px;
      box-shadow: 0 -10px 20px 16px #fff inset;
      color: #fff;
      text-shadow: 4px 4px 6px rgba(0, 0, 0, .2);

      &__text {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        padding: 16px;
        cursor: pointer;

        &__main {
          font-size: 1.85rem;
          font-weight: bold;
          letter-spacing: 2px;
        }

        &__sub {
          font-size: 1.1rem;
        }
      }

      &__image {
        height: 100%;
        width: 100%;
        transform: scale(1.4);
        z-index: $z-index-card-background;
        transition: all 200ms ease-in;
        opacity: .8;
        background-position: center;
        background-size: cover;
      }

    }

    &__header--withoutImage {
      color: #999;
      text-shadow: none;
    }

    &__main {
      margin-top: 40px;
      padding: 16px;
      line-height: 1.5;

      &__info {
        color: #999999;
        font-size: .9rem;

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
      .day-item__header__image {
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
    class="day-list__item day-item"
    @click.native="$router.push(`/day/${ $time(item.date).format('YYYY-MM-DD') }`)"
  >
    <div :class="{'day-item__header--withoutImage': !item.image}" class="day-item__header">
      <div v-lazy:background-image="$getOssUrl(item.image)" class="day-item__header__image"></div>
      <div class="day-item__header__text">
        <div class="day-item__header__text__main">
          {{ $time(item.date).format('MM.DD') }}
        </div>
        <div class="day-item__header__text__sub">
          {{ $time(item.date).format('YYYY dddd') }}
        </div>
      </div>
    </div>
    <div class="day-item__main">
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
