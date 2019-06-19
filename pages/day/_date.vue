<style lang="scss">
  .day {

    &__card {
      display: flex;
      flex-flow: row nowrap;
      height: 600px;
      overflow: hidden;

      &__banner {
        position: relative;
        flex: 0 0 40%;
        overflow: hidden;

        &__image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center center;
          background-attachment: fixed;
        }

        &__text {
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: #fff;
          line-height: 1.5;
          font-size: 1.8rem;
          font-weight: bold;
          text-shadow: 1px 1px 6px rgba(0, 0, 0, .5);

          a {
            color: #fff;
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
    <container :max-width="1260">
      <card class="day__card">
        <div class="day__card__banner">
          <div v-lazy:background-image="$getOssUrl(data.dayItem.image)" class="day__card__banner__image"></div>
          <div class="day__card__banner__text">
            <clock format="YYYY/MM/DD">
              {{ data.dayItem.date }}
            </clock>
            <clock format="ddd">
              {{ data.dayItem.date }}
            </clock>
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
