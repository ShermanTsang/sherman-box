<style lang="scss">
.day {

  &__image {
    @apply w-full h-[600px] relative mb-10;

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
      max-width: 1600px;
      max-height: 900px;
      margin: 0 auto;
      z-index: $z-index-card-content;
      overflow: hidden;
      transition: all .2s ease-in-out;
      box-shadow: 2px 2px 26px rgba(0, 0, 0, .2);

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

      .day__image__main {
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
      }

    }

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
      <LayoutContainer class="day__image__main">
        <img v-lazy="$getOssUrl(data.dayItem.image)">
        <div v-if="data.dayItem.image_text" class="day__image__main__text">
          {{ data.dayItem.image_text }}
        </div>
      </LayoutContainer>
    </div>
    <LayoutContainer>
      <Blocker height="24px" />
      <Nameplate>
        <Datetime slot="title" :time="data.dayItem.date" format="YYYY年MM月DD日" class="day__date__text" />
        <small slot="subTitle">
          <Datetime :time="data.dayItem.date" format="ddd" />
        </small>
      </Nameplate>
      <div class="day__data">
        <Waterfall :column="3" gap="16px" class="day__data__main">
          <InfoCell v-if="data.dayItem.event" icon="calendar" name="事件">
            <Tag>{{ data.dayItem.event }}</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.time_sleep && data.dayItem.time_wakeup" icon="sleep" name="睡眠">
            <Tag>
              入眠{{ data.dayItem.time_sleep }},
              醒来{{ data.dayItem.time_wakeup }},
              时长{{ sleepHour }}
            </Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.weather" icon="weather" name="天气">
            <Tag>{{ data.dayItem.weather }}</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.step" icon="run" name="步数">
            <Tag>{{ data.dayItem.step }}步</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.weight" icon="weight" name="体重">
            <Tag>{{ data.dayItem.weight }}斤</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.movement" icon="schedule" name="活动">
            <Tag>{{ data.dayItem.movement }}</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.mood" icon="mood" name="状态">
            <Tag>{{ data.dayItem.mood }}</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.location" icon="location" name="位置">
            <Tag>{{ data.dayItem.location }}</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.people" icon="user" name="人物">
            <Tag>{{ data.dayItem.people }}</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.medicine" icon="medicine" name="药物">
            <Tag>{{ data.dayItem.medicine }}</Tag>
          </InfoCell>
          <InfoCell v-if="data.dayItem.food" icon="food" name="食物">
            <Tag>{{ data.dayItem.food }}</Tag>
            <template v-if="data.dayItem.food_images && data.dayItem.food_images.length>0">
              <Blocker height="30px" divider divider-height="1px" />
              <Pic
                v-for="url in JSON.parse(data.dayItem.food_images || '[]')"
                :key="url"
                :url="url"
                radius="2px"
                can-preview
                :styles="{width: '45%',height:'160px',margin:'4px',border:'1px solid #efefef'}"
              ></Pic>
            </template>
          </InfoCell>
          <InfoCell v-if="data.movieList && data.movieList.length > 0" icon="movie" name="观影">
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
          </InfoCell>
          <InfoCell v-if="data.blogList && data.blogList.length > 0" icon="post" name="博文">
            <Pic
              v-for="item in data.blogList"
              :key="item.id"
              :url="item.image"
              width="25%"
              height="200px"
              :style="{margin:'8px'}"
              :link="`/movie/${item.id}`"
            >
              {{ item.name }}
            </Pic>
          </InfoCell>
          <InfoCell v-if="data.projectList && data.projectList.length > 0" icon="project" name="项目">
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
          </InfoCell>
          <InfoCell v-if="data.ideaList && data.ideaList.length > 0" icon="bulb" name="想法">
            <ItemTimeline v-for="item in data.ideaList" :key="item.id" :item="item" text="detail" />
          </InfoCell>
          <InfoCell v-if="data.planList && data.planList.length > 0" icon="plan" name="计划">
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
          </InfoCell>
        </Waterfall>
      </div>
      <Blocker height="24px" />
      <Nameplate title="往昔回顾" sub-title="retrospect" />
      <InfoBox v-if="data.dayItem.day_previous" icon="angle-left" description="前一天" :path="`/day/${data.dayItem.day_previous.date}`" :image="data.dayItem.day_previous.image">
        <CustomText size="1.2rem">
          <Datetime :time="data.dayItem.day_previous.date" format="YYYY年" :link-with-timeline="false" />
        </CustomText>
        <br>
        <CustomText size="1rem">
          <Datetime :time="data.dayItem.day_previous.date" format="MM月DD日 ddd" :link-with-timeline="false" />
        </CustomText>
      </InfoBox><template v-if="differentYears">
        <InfoBox v-for="item in differentYears" :key="item.date" icon="check" :path="`/day/${item.date}`" :image="item.image">
          <CustomText size="1.2rem">
            <Datetime :time="item.date" format="YYYY年" :link-with-timeline="false" />
          </CustomText>
          <br>
          <CustomText size="1rem">
            <Datetime :time="item.date" format="MM月DD日 ddd" :link-with-timeline="false" />
          </CustomText>
          <Datetime slot="description" :time="item.date" type="date" only-from-now :link-with-timeline="false" />
        </InfoBox>
      </template><InfoBox v-if="data.dayItem.day_next" icon="angle-right" description="后一天" :path="`/day/${data.dayItem.day_next.date}`" :image="data.dayItem.day_next.image">
        <CustomText size="1.2rem">
          <Datetime :time="data.dayItem.day_next.date" format="YYYY年" :link-with-timeline="false" />
        </CustomText>
        <br>
        <CustomText size="1rem">
          <Datetime :time="data.dayItem.day_next.date" format="MM月DD日 ddd" :link-with-timeline="false" />
        </CustomText>
      </InfoBox>
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
        dayItem,
        movieCollection: movieList,
        ideaCollection: ideaList,
        blogCollection: blogList,
        projectCollection: projectList,
        mailboxCollection: mailboxList,
        planCollection: planList
      }
    } = await $axios.$get(`/api/days/${params.date}`)
    store.commit('SET_CURRENT_ITEM', {
      image: dayItem.image,
      name: `${dayItem.date}日迹`,
      category: dayItem.category,
      date: dayItem.date
    })
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
