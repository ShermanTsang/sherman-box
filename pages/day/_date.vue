<style lang="scss">
  .day {
  }
</style>

<template>
  <div class="day">
    <div class="day__header">
      <div class="day__header__image">
        <img v-lazy="$getOssUrl(data.dayItem.image)">
      </div>
      <div class="day__header__text">
        <div class="day__header__text__title">
          {{ data.dayItem.name }}
        </div>
        <blocker height="20px" />
        <div class="day__header__text__info">
          <icon name="clock" /> {{ $time(data.dayItem.datetime).format('YYYY-MM-DD') }} / {{ $time(data.dayItem.datetime).fromNow() }}
        </div>
      </div>
    </div>
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
