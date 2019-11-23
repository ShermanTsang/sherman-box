<style lang="scss">
  .day {

    &__card {
      overflow: hidden;

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

      }

      &__main {
        position: relative;
        padding: 16px;
        margin: 10px;

        &__item {
          break-inside: avoid;

          &:not(:first-child) {
            margin-bottom: 20px;
          }

          &__name {
            display: inline-flex;
            flex-flow: row nowrap;
            align-items: center;
            color: #666;
            letter-spacing: 2px;
            font-size: 1rem;
            padding: 10px 0;
            border-bottom: 2px solid #efefef;

            i {
              margin-right: 16px;
              font-size: 1.25rem;
              color: #999;
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

    &__block {
      border: 1px solid #efefef;
      padding: 16px;
      text-align: center;
      margin: 16px 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      &__sub {
        color: #999;
        font-size: 0.9rem;
      }

      &__main {
        color: #666;
        font-size: 1rem;
      }
    }

    &__control {
      padding: 16px;
      box-sizing: content-box;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;

      &__item {
        color: #666;
        font-size: .95rem;
      }

      &__item--divider {
        width: 2px;
        margin: 0 10px;
        height: 20px;
        background-color: #efefef;
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
      <layout-row :gutter="32">
        <layout-col :md="{span:16}" :lg="{span:16}">
          <Nameplate>
            <Datetime slot="title" format="YYYY年MM月DD日" class="day__date__text" :time="data.dayItem.date" />
            <small slot="subTitle">
              <Datetime format="ddd" :time="data.dayItem.date" />
            </small>
            <div class="day__control">
              <template v-if="data.dayItem.day_previous">
                <div class="day__control__item">
                  <Icon color="#ccc" name="angle-left" />
                  <Datetime :time="data.dayItem.day_previous.date" type="date" />
                </div>
              </template>
              <div v-if="data.dayItem.day_previous && data.dayItem.day_next" class="day__control__item day__control__item--divider">
              </div>
              <template v-if="data.dayItem.day_next">
                <div class="day__control__item">
                  <Datetime :time="data.dayItem.day_next.date" type="date" />
                  <Icon color="#ccc" name="angle-right" />
                </div>
              </template>
            </div>
          </Nameplate>
          <Card class="day__card">
            <div v-if="data.dayItem.image" class="day__card__banner">
              <div v-lazy:background-image="$getOssUrl(data.dayItem.image)" class="day__card__banner__image"></div>
            </div>
            <Waterfall gap="16px" class="day__card__main" :column="2">
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
                  状态
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
        </layout-col>
        <layout-col :md="{span:8}" :lg="{span:8}">
          <Blocker height="20px" />
          <Nameplate title="那年今日" sub-title="retrospect" />
          <Card
            v-for="item in data.dayItem.day_different_year"
            v-if="data.dayItem.day_different_year && data.dayItem.date.indexOf(item.date) === -1"
            :key="item.date"
            class="day__block"
          >
            <div class="day__block__main">
              <Datetime :time="item.date" type="date" from-now />
            </div>
          </Card>
          <Blocker height="30px" />
          <Nameplate title="记录" sub-title="record" />
          <item-common v-for="item in allItem" :key="item.id" :item="item"></item-common>
        </layout-col>
      </layout-row>
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
    const { date } = this.data.dayItem
    return {
      title: `${date.substring(0, 11)} - 日迹`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${date.substring(0, 11)}日迹`)
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
      return [...movieList, ...ideaList, ...blogList, ...projectList, ...mailboxList, ...planList]
    }
  },
  async asyncData({ $axios, store, params }) {
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
    store.commit('currentItem', dayItem)
    return {
      data: { dayItem, movieList, ideaList, blogList, projectList, mailboxList, planList }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
