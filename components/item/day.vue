<style lang="scss">
.day-item {
  transition-duration: 0.2s;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 400px;

  &__meta {
    position: absolute;
    letter-spacing: 1px;
    top: 0;
    left: 0;
    right: 0;
    color: #efefef;
    z-index: $z-index-card-content;
    padding: 16px;
    cursor: pointer;
    text-align: center;

    &__main {
      font-size: 1.7rem;
      font-weight: bolder;
      letter-spacing: 1px;
      line-height: 1.8;
    }

    &__sub {
      font-size: 1rem;
      line-height: 1.5;
    }

  }

  &__info {
    position: absolute;
    letter-spacing: 1px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: $z-index-card-content;
    font-size: .9rem;

    &__detail {
      padding: 16px;

      &__item {
        color: #fff;
        display: inline-block;
        border-bottom: 2px solid rgba(255, 255, 255, .3);
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
      background-image: linear-gradient(hsla(0, 0%, 20%, 0), hsla(0, 0%, 20%, .6));
      content: '';
    }
  }

  &:hover {
    .day-item__image {
      &:before {
        background-color: rgba(0, 0, 0, .1);
      }
    }
  }
}

.day-item--withoutImage {
  .day-item__meta {
    color: #999;
  }

  .day-item__info__detail__item {
    color: #999;
    border-color: #efefef;

    i {
      color: #ccc;
    }
  }
}
</style>

<template>
  <Card
    class="day-list__item day-item"
    :class="{'day-item--withoutImage': !item.image}"
    @click.native="$router.push(`/day/${ $time(item.date).format('YYYY-MM-DD') }`)"
  >
    <div v-if="item.image" v-lazy:background-image="$getOssUrl(item.image)" class="day-item__image"></div>
    <div class="day-item__meta">
      <div class="day-item__meta__main">
        <CustomText>{{ $time(item.date).format('MM.DD') }}</CustomText>
      </div>
      <div class="day-item__meta__sub">
        <CustomText>{{ $time(item.date).format('YYYY') }} / {{ $time(item.date).format('dddd') }}</CustomText>
      </div>
    </div>
    <div class="day-item__info">
      <div class="day-item__info__detail">
        <div v-if="item.event" class="day-item__info__detail__item">
          <icon name="calendar" />
          {{ $getStringCount(item.event) }} <small>件</small>
        </div>
        <div v-if="item.step" class="day-item__info__detail__item">
          <icon name="run" />
          {{ item.step }} <small>步</small>
        </div>
        <div v-if="item.weight" class="day-item__info__detail__item">
          <icon name="weight" />
          {{ item.weight }} <small>斤</small>
        </div>
        <div v-if="item.movement" class="day-item__info__detail__item">
          <icon name="schedule" />
          {{ $getStringCount(item.movement) }} <small>项</small>
        </div>
        <div v-if="item.people" class="day-item__info__detail__item">
          <icon name="user" />
          {{ $getStringCount(item.people) }} <small>人</small>
        </div>
        <div v-if="item.food" class="day-item__info__detail__item">
          <icon name="food" />
          {{ $getStringCount(item.food) }} <small>类</small>
        </div>
        <div v-if="item.location" class="day-item__info__detail__item">
          <icon name="location" />
          {{ $getStringCount(item.location) }} <small>处</small>
        </div>
        <div v-if="item.mood" class="day-item__info__detail__item">
          <icon name="mood" />
          {{ $getStringCount(item.mood) }} <small>种</small>
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
