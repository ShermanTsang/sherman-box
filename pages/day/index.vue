<template>
  <LayoutContainer>
    <DatePicker
      class="my-10"
      :default-year=" Number.parseInt($route.query.year) || new Date().getFullYear()"
      :default-month="Number.parseInt($route.query.month) || (new Date().getMonth() + 1)"
      @changeDate="changeDate"
    />
    <template v-if="data.dayList.length === 0">
      <Tip lottie="astronaut" :height="600">
        这部分的时光数据在远行
      </Tip>
    </template>
    <template>
      <InfoBox
        v-for="item in data.dayList"
        :key="item.date"
        :path="`/day/${item.date}`"
        :image="item.image"
      >
        <CustomText size="1.2rem">
          <Datetime :time="item.date" format="YYYY年" :link-with-timeline="false" />
        </CustomText>
        <CustomText size="1rem">
          <Datetime :time="item.date" format="MM月DD日 ddd" :link-with-timeline="false" />
        </CustomText>
        <Datetime slot="description" :time="item.date" type="date" only-from-now :link-with-timeline="false" />
      </InfoBox>
    </template>
    <Blocker height="40px" />
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData ({ $axios, query }) {
    const { data: dayList, meta } = await $axios.$get('/api/days', {
      params: {
        year: Number.parseInt(query.year) || new Date().getFullYear(),
        month: Number.parseInt(query.month) || (new Date().getMonth() + 1),
        pageSize: 31,
        page: query.page
      }
    })
    return {
      data: {
        dayList
      },
      meta
    }
  },
  head () {
    return {
      title: '日迹',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '日迹列表') }
      ]
    }
  },
  watchQuery: ['page', 'year', 'month'],
  mounted () {
  },
  methods: {
    changeDate (date) {
      const [year, month] = date.split('-')
      this.$router.push({ name: 'day', query: { year, month } })
    }
  }
}
</script>
