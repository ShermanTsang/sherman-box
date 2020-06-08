<style lang="scss">
  .day-item {
    transition-duration: 0.2s;
    text-overflow: ellipsis;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 300px;

    &__meta {
      position: relative;
      flex-basis: 120px;
      color: #999;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      padding: 16px;
      cursor: pointer;
      text-align: center;

      &__main {
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 1px;
        line-height: 1.8;
      }

      &__sub {
        font-size: 1rem;
        line-height: 1.5;
      }

    }

    &__main {
      border-left: 2px dotted #eee;
      position: relative;
      flex-grow: 1;
      overflow: hidden;

      &__info {
        position: absolute;
        letter-spacing: 1px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: $z-index-card-content;
        font-size: .9rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-content: center;

        &__detail {
          padding: 16px;

          &__item {
            color: #fff;
            display: inline-block;
            border-bottom: 2px solid rgba(255,255,255,.3);
            padding: 6px 10px;
            border-radius: 2px;
            cursor: default;
            font-size: .95rem;
            margin: 4px;

            i {
              font-size: 1.25rem;
              color: #efefef;
            }

            small {
              font-size: .85rem;
            }

          }

        }

      }

      &__image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        z-index: $z-index-card-background;
        transition: all 200ms ease-in;
        background-position: center;
        background-size: cover;

        &:before {
          transition: all 200ms ease-in;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          width: 100%;
          z-index: $z-index-card-background;
          background-color: rgba(0,0,0,.4);
          content: '';
        }
      }

    }

    &__main--withoutImage {
      .day-item__main__info__detail__item {
        color: #999;
        border-color: #efefef;

        i {
          color: #ccc;
        }
      }
    }

    &:hover {
      .day-item__main__image {
        &:before {
          background-color: rgba(0,0,0,.1);
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
    <div class="day-item__meta">
      <div class="day-item__meta__main">
        {{ $time(item.date).format('MM.DD') }}
      </div>
      <div class="day-item__meta__sub">
        {{ $time(item.date).format('YYYY') }}
        <br>
        {{ $time(item.date).format('dddd') }}
      </div>
    </div>
    <div class="day-item__main" :class="{'day-item__main--withoutImage': !item.image}">
      <div v-if="item.image" v-lazy:background-image="$getOssUrl(item.image)" class="day-item__main__image"></div>
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
