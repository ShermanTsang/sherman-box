<style lang="scss">
  .day {

    &__image {
      position: relative;
      height: 400px;
      margin-bottom: 60px;

      &__background {
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        z-index: $z-index-card-background;
        border-radius: 2px;
        background-size: cover;
        background-position: center;
        filter: blur(2.5px);
        transform: scale(1.2);
        opacity: 0.8;
        box-shadow: 0 -40px 30px 40px #fff inset;
        transition: all .2s ease-in-out;
      }

      &__main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 960px;
        height: 420px;
        max-width: 85%;
        margin: 0 auto;
        z-index: $z-index-card-content;
        overflow: hidden;
        transition: all .2s ease-in-out;
        box-shadow: 2px 2px 26px rgba(0, 0, 0, .2);
        border-radius: 6px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &__text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 16px;
          color: #efefef;
          letter-spacing: 1px;
          width: 100%;
          background-image: linear-gradient(126deg, rgba(0, 0, 0, .4), transparent);
        }

      }

      &:hover {
        .day__image__background {
          opacity: .5;
          animation: imageMove 6s ease-in-out forwards infinite;
        }

        .day__image__main {
          box-shadow: 0 0 30px rgba(0, 0, 0, .4);
        }
      }

    }

    &__data {
      overflow: hidden;

      &__main {
        position: relative;

        &__item {
          border: 1px solid #efefef;
          padding: 16px;
          break-inside: avoid;
          margin-bottom: 16px;
          transition: .2s all ease-in-out;

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
              margin-right: 10px;
              font-size: 1.25rem;
              color: #999;
            }
          }

          &__content {
            overflow: hidden;
            margin-top: 10px;
            padding: 10px 0;
          }

          &:hover {
            box-shadow: 0 0 14px rgba(0, 0, 0, .1) inset;
          }
        }
      }
    }

    &__block {
      padding: 16px;
      text-align: center;
      margin: 16px 0;

      &__main {
        font-size: 1rem;
      }

    }

    &__paginator {
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

  }

  @keyframes imageMove {
    0% {
      background-position: top left;
    }
    50% {
      background-position: center center;
    }
    100% {
      background-position: bottom right;
    }
  }

</style>

<template>
  <div class="day">
    <Blocker height="40px" />
    <div v-if="data.dayItem.image" class="day__image">
      <div
        v-lazy:background-image="$getOssUrl(data.dayItem.image)"
        class="day__image__background"
      >
      </div>
      <div class="day__image__main">
        <img v-lazy="$getOssUrl(data.dayItem.image)">
        <div v-if="data.dayItem.image_text" class="day__image__main__text">
          {{ data.dayItem.image_text }}
        </div>
      </div>
    </div>
    <LayoutContainer>
      <LayoutRow :gutter="24">
        <LayoutCol
          :lg="{span:24}"
          :xl="{span:20}"
        >
          <Nameplate>
            <Datetime slot="title" :time="data.dayItem.date" format="YYYY年MM月DD日" class="day__date__text" />
            <small slot="subTitle">
              <Datetime :time="data.dayItem.date" format="ddd" />
            </small>
            <div class="day__paginator">
              <template v-if="data.dayItem.day_previous">
                <div class="day__paginator__item">
                  <Icon color="#ccc" name="angle-left" />
                  <Datetime :time="data.dayItem.day_previous.date" type="date" />
                </div>
              </template>
              <div
                v-if="data.dayItem.day_previous && data.dayItem.day_next"
                class="day__paginator__item day__paginator__item--divider"
              >
              </div>
              <template v-if="data.dayItem.day_next">
                <div class="day__paginator__item">
                  <Datetime :time="data.dayItem.day_next.date" type="date" />
                  <Icon color="#ccc" name="angle-right" />
                </div>
              </template>
            </div>
          </Nameplate>
          <div class="day__data">
            <Waterfall :column="2" gap="16px" class="day__data__main">
              <div v-if="data.dayItem.event" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="calendar" />
                  事件
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.event }}</tag>
                </div>
              </div>
              <div v-if="data.dayItem.time_sleep && data.dayItem.time_wakeup" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="sleep" />
                  睡眠
                </div>
                <div class="day__data__main__item__content">
                  <Tag>
                    入眠{{ data.dayItem.time_sleep }},
                    醒来{{ data.dayItem.time_wakeup }},
                    时长{{ sleepHour }}
                  </tag>
                </div>
              </div>
              <div v-if="data.dayItem.weather" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="weather" />
                  天气
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.weather }}</tag>
                </div>
              </div>
              <div v-if="data.dayItem.step" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="run" />
                  步数
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.step }}步</tag>
                </div>
              </div>
              <div v-if="data.dayItem.weight" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="weight" />
                  体重
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.weight }}斤</tag>
                </div>
              </div>
              <div v-if="data.dayItem.movement" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="schedule" />
                  活动
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.movement }}</tag>
                </div>
              </div>
              <div v-if="data.dayItem.mood" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="mood" />
                  状态
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.mood }}</tag>
                </div>
              </div>
              <div v-if="data.dayItem.location" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="location" />
                  位置
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.location }}</tag>
                </div>
              </div>
              <div v-if="data.dayItem.people" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="user" />
                  人物
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.people }}</tag>
                </div>
              </div>
              <div v-if="data.dayItem.food" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="food" />
                  食物
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.food }}</tag>
                  <template v-if="data.dayItem.food_images && data.dayItem.food_images.length>0">
                    <Blocker height="30px" divider divider-height="1px" />
                    <Pic
                      v-for="url in data.dayItem.food_images"
                      :key="url"
                      :url="url"
                      radius="2px"
                      can-preview
                      :styles="{width: '30%',height:'120px',margin:'4px',border:'1px solid #efefef'}"
                    ></Pic>
                  </template>
                </div>
              </div>
              <div v-if="data.dayItem.medicine" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="medicine" />
                  药物
                </div>
                <div class="day__data__main__item__content">
                  <Tag>{{ data.dayItem.medicine }}</tag>
                </div>
              </div>
              <div v-if="data.movieList && data.movieList.length > 0" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="movie" />
                  观影
                </div>
                <div class="day__data__main__item__content">
                  <Pic
                    v-for="item in data.movieList"
                    :key="item.id"
                    :url="item.image"
                    width="30%"
                    height="340px"
                    :style="{margin:'8px'}"
                    :link="`/movie/${item.id}`"
                  >
                    {{ item.name }}
                  </Pic>
                </div>
              </div>
              <div v-if="data.blogList && data.blogList.length > 0" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="post" />
                  博文
                </div>
                <div class="day__data__main__item__content">
                  <Pic
                    v-for="item in data.mblogList"
                    :key="item.id"
                    :url="item.image"
                    width="25%"
                    height="200px"
                    :style="{margin:'8px'}"
                    :link="`/movie/${blog.id}`"
                  >
                    {{ item.name }}
                  </Pic>
                </div>
              </div>
              <div v-if="data.projectList && data.projectList.length > 0" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="project" />
                  项目
                </div>
                <div class="day__data__main__item__content">
                  <Pic
                    v-for="item in data.projectList"
                    :key="item.id"
                    :url="item.image"
                    width="100%"
                    height="200px"
                    :style="{margin:'8px'}"
                    :link="`/project/${item.id}`"
                  >
                    {{ item.name }}
                  </Pic>
                </div>
              </div>
              <div v-if="data.ideaList && data.ideaList.length > 0" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="idea" />
                  想法
                </div>
                <div class="day__data__main__item__content">
                  <ItemTimeline v-for="item in data.ideaList" :key="item.id" :item="item" text="detail" />
                </div>
              </div>
              <div v-if="data.planList && data.planList.length > 0" class="day__data__main__item">
                <div class="day__data__main__item__name">
                  <Icon name="plan" />
                  计划
                </div>
                <div class="day__data__main__item__content">
                  <Pic
                    v-for="item in data.planList"
                    :key="item.id"
                    :url="item.image"
                    width="30%"
                    height="200px"
                    :style="{margin:'8px'}"
                    :link="`/plan/${item.id}`"
                  >
                    {{ item.name }}
                  </Pic>
                </div>
              </div>
            </Waterfall>
          </div>
        </LayoutCol>
        <LayoutCol
          :lg="{span:24}"
          :xl="{span:4}"
        >
          <template v-if="differentYears">
            <Nameplate title="那年今日" sub-title="retrospect" />
            <Card
              v-for="item in differentYears"
              :key="item.date"
              class="day__block"
            >
              <Datetime :time="item.date" type="date" from-now />
            </Card>
          </template>
        </LayoutCol>
      </LayoutRow>
    </LayoutContainer>
    <Blocker height="60px" />
    <LayoutContainer>
      <Comment :id="data.dayItem.id" module="day" />
    </LayoutContainer>
    <Blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(params.date)
  },
  async asyncData ({ $axios, store, params }) {
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
    store.commit('SET_CURRENT_ITEM', { image:dayItem.image, name: `${dayItem.date}日迹`, category: dayItem.category, date: dayItem.date })
    return {
      data: { dayItem, movieList, ideaList, blogList, projectList, mailboxList, planList }
    }
  },
  computed: {
    sleepHour () {
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
    differentYears () {
      const differentYears = this.data.dayItem.day_different_year
      if (differentYears) {
        return differentYears.filter(item => !this.data.dayItem.date.includes(item.date))
      }
      return null
    }
  },
  mounted () {
  },
  methods: {},
  head () {
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
  }
}
</script>
