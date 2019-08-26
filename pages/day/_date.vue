<style lang="scss">
  .day {

    &__card {
      overflow: hidden;

      &__banner--plain {
        padding: 20px 20px 0 20px;
        line-height: 1.2;
        font-size: 1.8rem;
        color: #666;

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
            display: block;
            font-weight: bolder;
            letter-spacing: 1px;
            width: 200px;
            text-align: justify;
            text-align-last: justify;
          }

          a {
            color: #fff;
          }
        }
      }

      &__main {
        position: relative;
        padding: 32px;
        margin: 10px;

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
            padding: 10px 0;

            i {
              margin-right: 20px;
              font-size: 1.1rem;
            }
          }

          &__content {
            overflow: hidden;
            margin-top: 10px;
            padding: 10px 0;
          }
        }
      }
    }

    @media ($screen-xs-max) {
      &__card {
        &__banner {
          height: 300px;

          &__image {
            &:after {
              display: none;
            }
          }

          &__text {
            bottom: 20px;
            left: 20px;
          }
        }

        &__main {
          padding: 16px;
          margin: 0;

          &__item {
            margin-bottom: 10px !important;
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
    <Blocker height="40px" />
    <layout-container>
      <Nameplate title="数据" sub-title="data" />
      <Card class="day__card">
        <div v-if="data.dayItem.image" class="day__card__banner">
          <div v-lazy:background-image="$getOssUrl(data.dayItem.image)" class="day__card__banner__image"></div>
          <div class="day__card__banner__text">
            <Moment format="YYYY.MM.DD" class="day__card__banner__text__date" :time="data.dayItem.date" />
            <small>
              <Moment format="ddd" :time="data.dayItem.date" />
            </small>
          </div>
        </div>
        <div v-else class="day__card__banner--plain">
          <Moment format="YYYY.MM.DD" class="day__card__banner--plain__date" :time="data.dayItem.date" />
          <br>
          <small>
            <Moment format="ddd" :time="data.dayItem.date" />
          </small>
        </div>
        <Waterfall gap="10px" class="day__card__main">
          <div v-if="data.dayItem.event" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="calendar" />
              事件
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.event }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.time_sleep && data.dayItem.time_wakeup" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="sleep" />
              睡眠
            </div>
            <div class="day__card__main__item__content">
              <Tag>
                入眠{{ data.dayItem.time_sleep }},
                醒来{{ data.dayItem.time_wakeup }},
                时长{{ sleepHour }}
              </tag>
            </div>
          </div>
          <div v-if="data.dayItem.weather" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="weather" />
              天气
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.weather }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.step" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="run" />
              步数
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.step }}步</tag>
            </div>
          </div>
          <div v-if="data.dayItem.weight" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="weight" />
              体重
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.weight }}斤</tag>
            </div>
          </div>
          <div v-if="data.dayItem.movement" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="schedule" />
              活动
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.movement }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.mood" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="mood" />
              情绪
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.mood }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.location" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="location" />
              位置
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.location }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.people" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="user" />
              人物
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.people }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.food" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="food" />
              食物
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.food }}</tag>
            </div>
          </div>
          <div v-if="data.dayItem.medicine" class="day__card__main__item">
            <div class="day__card__main__item__name">
              <Icon name="medicine" />
              药物
            </div>
            <div class="day__card__main__item__content">
              <Tag>{{ data.dayItem.medicine }}</tag>
            </div>
          </div>
        </Waterfall>
      </Card>
    </layout-container>
    <Blocker height="40px" />
    <layout-container>
      <Nameplate title="记录" sub-title="record" />
      <item-common v-for="item in allItem" :key="item.id" :item="item"></item-common>
    </layout-container>
    <Blocker height="60px" />
    <layout-container>
      <Comment :id="data.dayItem.id" module="day" :source-data="data.dayItem.comments" />
    </layout-container>
    <Blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(params.date)
  },
  head() {
    return {
      title: `${this.data.dayItem.date.substring(0, 11)} - 日迹`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${this.data.dayItem.date.substring(0, 11)}日迹`)
        }
      ]
    }
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
    },
    allItem() {
      const { movieList, ideaList, blogList, projectList, mailboxList, planList } = this.data
      const allItem = []
      return allItem.concat(movieList, ideaList, blogList, projectList, mailboxList, planList)
    }
  },
  async asyncData({ $axios, params }) {
    const {
      data: {
        dayItem, movieCollection: movieList,
        ideaCollection: ideaList,
        blogCollection: blogList,
        projectCollection: projectList,
        mailboxCollection: mailboxList,
        planCollection: planList
      }
    } = await $axios.$get(`/api/days/${params.date}`)
    return {
      data: { dayItem, movieList, ideaList, blogList, projectList, mailboxList, planList }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
