<style lang="scss">
  .day-item {
    position: relative;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;

    &__image {
      position: relative;
      transition: all 200ms ease-in;
      opacity: .5;
      height: 240px;
      cursor: pointer;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__main {
      padding: 16px 32px;

      &__date {
        display: inline-block;
        padding-bottom: 10px;
        border-bottom: 4px solid #efefef;
        cursor: pointer;

        &__main {
          font-size: 1.8rem;
          font-weight: bold;
          letter-spacing: 2px;
          color: #ccc;
        }

        &__sub {
          font-size: 1rem;
          color: #999;
        }

      }

      &__info {
        color: #999999;
        font-size: .9rem;
        margin-top: 10px;

        &__detail {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;

          &__item {
            width: 33%;
            cursor: default;
            font-size: .95rem;
            margin: 6px 0;

            i {
              font-size: 1.25rem;
              color: #ccc;
            }

          }
        }
      }
    }

    &:hover {
      .day-item__image {
        opacity: 1;
        transform: none;
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
  >
    <div
      v-if="item.image"
      class="day-item__image"
      @click="$router.push(`/day/${ $time(item.date).format('YYYY-MM-DD') }`)"
    >
      <img :src="$getOssUrl(item.image)">
    </div>
    <div class="day-item__main">
      <div class="day-item__main__date" @click="$router.push(`/day/${ $time(item.date).format('YYYY-MM-DD') }`)">
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
