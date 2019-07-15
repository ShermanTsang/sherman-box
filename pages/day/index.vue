<style lang="scss">
  .day-list {
    &__item {
      margin-bottom: 20px;
    }
  }

  .day-card {
    position: relative;
    padding: 20px;
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
      height: 180px;

      &__title {
        display: inline-block;
        font-size: 1rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        border-bottom: 2px solid #efefef;
        small{
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

            i{
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

      &::after {
        content: '';
        position: absolute;
        top: -34px;
        bottom: 0;
        left: -2px;
        width: 0;
        height: 0;
        border-top: 260px solid transparent;
        border-left: 50px solid #fff;
      }
    }

    &:hover {
      .day-card__image {
        opacity: 1;
        transform: none;
      }
    }

    @media only screen and (max-width: 600px) {
      flex: 0 0 75%;
      &__image {
        flex: 0 0 25%;
        width: 180px;
      }
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.dayCollection" class="day-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.dayCollection"
          :key="item.id"
          class="gutter-row"
          :md="24"
          :lg="12"
          :xl="12"
        >
          <card
            class="day-list__item day-card"
          >
            <div class="day-card__main">
              <div class="day-card__main__title">
                <nuxt-link :to="`/day/${ $time(item.date).format('YYYY-MM-DD') }`">
                  {{ $time(item.date).format('YYYY年MM月DD日') }} {{ $time(item.date).format('dddd') }}
                  <br>
                  <small>{{ $time(item.date).format('YY') }}年的第{{ $time(item.date).format('DDD') }}天（{{
                    Math.ceil($time(item.date).format('DDD')/365*100) }}%）</small>
                </nuxt-link>
              </div>
              <div class="day-card__main__info">
                <div class="day-card__main__info__detail">
                  <div v-if="item.event" class="day-card__main__info__detail__item">
                    <icon name="calendar" /> {{ $getStringCount(item.event) }}件
                  </div>
                  <div v-if="item.step" class="day-card__main__info__detail__item">
                    <icon name="run" /> {{ item.step }}步
                  </div>
                  <div v-if="item.weight" class="day-card__main__info__detail__item">
                    <icon name="weight" /> {{ item.weight }}斤
                  </div>
                  <div v-if="item.movement" class="day-card__main__info__detail__item">
                    <icon name="schedule" /> {{ $getStringCount(item.movement) }}项
                  </div>
                  <div v-if="item.people" class="day-card__main__info__detail__item">
                    <icon name="user" /> {{ $getStringCount(item.people) }}人
                  </div>
                  <div v-if="item.food" class="day-card__main__info__detail__item">
                    <icon name="food" /> {{ $getStringCount(item.food) }}类
                  </div>
                  <div v-if="item.location" class="day-card__main__info__detail__item">
                    <icon name="location" /> {{ $getStringCount(item.location) }}处
                  </div>
                  <div v-if="item.mood" class="day-card__main__info__detail__item">
                    <icon name="mood" /> {{ $getStringCount(item.mood) }}种
                  </div>
                </div>
              </div>
            </div>
            <nuxt-link :to="`/day/${ $time(item.date).format('YYYY-MM-DD') }`">
              <div v-if="item.image" v-lazy:background-image="$getOssUrl(item.image)" class="day-card__image">
              </div>
            </nuxt-link>
          </card>
        </a-col>
      </a-row>
    </div>
    <blocker height="40px" />
    <pagination
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <blocker height="40px" />
  </container>
</template>

<script>
export default {
  data() {
    return {}
  },
  async asyncData({ $axios, query }) {
    const { data: dayCollection, meta } = await $axios.$get(`/api/days`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        dayCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'day', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
