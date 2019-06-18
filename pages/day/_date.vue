<style lang="scss">
  .day {

    &__card {
      display: flex;
      flex-flow: row nowrap;
      height: 600px;
      overflow: hidden;

      &__banner {
        flex: 0 0 40%;
        overflow: hidden;

        &__image {
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      &__main {
        flex: 0 0 60%;
      }
    }
  }
</style>

<template>
  <div class="day">
    <blocker height="40px" />
    <container :max-width="1060">
      <card class="day__card">
        <div class="day__card__banner">
          <div class="day__card__banner__image">
            <img v-lazy="$getOssUrl(data.dayItem.image)">
          </div>
          <div class="day__card__banner__text">
            <div class="day__card__banner__text__title">
              {{ data.dayItem.name }}
            </div>
            <blocker height="20px" />
            <div class="day__card__banner__text__info">
              <icon name="clock" />
              {{ $time(data.dayItem.datetime).format('YYYY-MM-DD') }} / {{ $time(data.dayItem.datetime).fromNow() }}
            </div>
          </div>
        </div>
        <div class="day__card__main"></div>
      </card>
    </container>
    <blocker height="60px" />
    <container :max-width="1060">
      <comment :data="data.dayItem.comments" />
    </container>
    <blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(params.date)
  },
  async asyncData({ $axios, params }) {
    const { data: dayItem } = await $axios.$get(`/api/days/${params.date}`)
    return {
      data: {
        dayItem
      }
    }
  }
}
</script>
