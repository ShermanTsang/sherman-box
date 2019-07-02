<style lang="scss">
  .day {

    &__card {
      overflow: hidden;

      &__banner--plain {
        padding: 20px;
        line-height: 1.2;
        font-size: 1.8rem;

        &__date {
          font-weight: bolder;
          letter-spacing: 1px;
        }
      }

      &__banner {
        height: 400px;
        position: relative;
        overflow: hidden;

        &__image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          animation: imageMove 8s ease-in-out infinite;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            height: 0;
            width: 100%;
            border-left: 1400px solid transparent;
            border-bottom: 80px solid #fff;
          }
        }

        &__text {
          position: absolute;
          bottom: 60px;
          left: 40px;
          color: #fff;
          line-height: 1.2;
          font-size: 1.8rem;
          text-shadow: 0 0 6px rgba(0, 0, 0, .8);

          &__date {
            font-weight: bolder;
            letter-spacing: 1px;
          }

          a {
            color: #fff;
          }
        }
      }

      &__main {
        position: relative;
        margin: 10px;
        column-count: 3;
        column-gap: 20px;

        &__item {
          break-inside: avoid;
          border-top: 1px solid #eee;

          &:not(:first-child) {
            margin-bottom: 20px;
          }

          &__name {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            color: #666;
            letter-spacing: 2px;
            font-size: 1rem;
            padding: 10px;

            i {
              margin-right: 20px;
              font-size: 1.1rem;
            }
          }

          &__content {
            overflow: hidden;
            margin-top: 10px;
            padding: 10px;
          }
        }
      }
    }

  }

  @keyframes imageMove {
    0% {
      background-position: center top;
    }
    25% {
      background-position: center center;
    }
    50% {
      background-position: center bottom;
    }
    75% {
      background-position: center center;
    }
    100% {
      background-position: center top;
    }
  }

</style>

<template>
  <div class="day">
    <blocker height="40px" />
    <container :max-width="1280">
      <card class="day__card">
        <div v-if="data.dayItem.image" class="day__card__banner">
          <div v-lazy:background-image="$getOssUrl(data.dayItem.image)" class="day__card__banner__image"></div>
          <div class="day__card__banner__text">
            <clock format="YYYY.MM.DD" class="day__card__banner__text__date">
              {{ data.dayItem.date }}
            </clock>
            <br>
            <small>
              <clock format="ddd">
                {{ data.dayItem.date }}
              </clock>
            </small>
          </div>
        </div>
        <div v-else class="day__card__banner--plain">
          <clock format="YYYY.MM.DD" class="day__card__banner--plain__date">
            {{ data.dayItem.date }}
          </clock>
          <br>
          <small>
            <clock format="ddd">
              {{ data.dayItem.date }}
            </clock>
          </small>
        </div>
        <div class="day__card__main">
          <div v-if="data.dayItem.time_sleep && data.dayItem.time_wakeup" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="sleep" />
              睡眠
            </div>
            <div class="day__card__main__item__content">
              <tag>
                入眠{{ data.dayItem.time_sleep }},
                醒来{{ data.dayItem.time_wakeup }},
                时长{{ sleepHour }}
              </tag>
            </div>
          </div>
          <div v-if="data.dayItem.weather" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="weather" />
              天气
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.weather }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.step" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="run" />
              步数
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.step }}步</tag>
            </div>
          </div>
          <div v-if="data.dayItem.weight" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="weight" />
              体重
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.weight }}斤</tag>
            </div>
          </div>
          <div v-if="data.dayItem.mood" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="mood" />
              情绪
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.mood }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.location" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="location" />
              位置
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.location }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.people" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="user" />
              人物
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.people }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.food" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="food" />
              食物
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.food }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.medicine" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <icon name="medicine" />
              药物
            </div>
            <div class="day__card__main__item__content">
              <tag>{{ data.dayItem.medicine }}</tag>
            </div>
          </div>
        </div>
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
  computed: {
    sleepHour() {
      const sleepTime = this.data.dayItem.time_sleep
      const wakeupTime = this.data.dayItem.time_wakeup
      if (sleepTime && wakeupTime) {
        const sleepDate = this.data.dayItem.time_sleep.indexOf('0') === 0 ? '1996-05-21' : '1996-05-20'
        const sleepTimeFormatted = this.$time(`${sleepDate} ${sleepTime}`)
        const wakeupTimeFormatted = this.$time(`1996-05-21 ${wakeupTime}`)
        return wakeupTimeFormatted.diff(sleepTimeFormatted, 'hours') + '时'
      }
      return '不详'
    }
  },
  async asyncData({ $axios, params }) {
    const { data: dayItem } = await $axios.$get(`/api/days/${params.date}`)
    return {
      data: {
        dayItem
      }
    }
  },
  mounted() {
    this.renderGradientColor('.day__background')
  },
  methods: {
    renderGradientColor(selector) {
      this.$grade(document.querySelectorAll(selector))
    }
  }
}
</script>
