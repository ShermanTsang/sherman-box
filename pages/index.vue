<style lang="scss">
.index {
  $slide-padding: 48px;

  &__about {
    margin: $slide-padding;
    max-width: 840px;
    letter-spacing: 1px;
    line-height: 1.6;

    &__button {
      display: flex;
      flex-flow: row nowrap;
      border-top: 1px solid #efefef;
      padding-top: 16px;

      &__item {
        &:not(:first-child) {
          margin-left: 16px;
        }
      }
    }
  }

  &__module {
    margin: $slide-padding;

    &__title {
      margin: 36px 0;
      line-height: 1.6;
    }

    &__area {

    }
  }

}
</style>

<template>
  <div class="index">
    <Slider>
      <SliderItem layout="flex-column-center">
        <div class="index__about">
          <CustomFont color="#666" size="3.4rem">
            你好，
          </CustomFont>
          <CustomFont color="#666" size="2.9rem">
            我叫曾小满。
          </CustomFont>
          <CustomFont color="#999" size="1.5rem">
            一位热爱生活、富有创造力的开发者。
          </CustomFont>
          <CustomFont color="#666" size="1.3rem" height="2">
            很高兴与你相遇！
          </CustomFont>
          <Blocker height="16px" />
          <div class="index__about__button">
            <div class="index__about__button__item">
              <Btn :to="{name:'timeline'}">
                <Icon name="home" />
                <CustomFont display="inline">
                  进入
                </CustomFont>
              </Btn>
            </div>
            <div class="index__about__button__item">
              <Search ref="search">
                <Btn @click="$refs.search.state.showModal = true">
                  <Icon name="search" />
                  <CustomFont display="inline">
                    搜索
                  </CustomFont>
                </Btn>
              </Search>
            </div>
            <div v-if="false" class="index__about__button__item">
              <Search ref="search">
                <Btn @click="$refs.search.state.showModal = true">
                  <Icon name="token" />
                  <CustomFont display="inline">
                    口令
                  </CustomFont>
                </Btn>
              </Search>
            </div>
            <div v-if="false" class="index__about__button__item">
              <Search ref="search">
                <Btn @click="$refs.search.state.showModal = true">
                  <Icon name="door" />
                  <CustomFont display="inline">
                    任意门
                  </CustomFont>
                </Btn>
              </Search>
            </div>
          </div>
        </div>
      </SliderItem>
      <SliderItem layout="flex-column-center" :background-image="$getImageAsset('index-module-background')">
        <div class="index__module">
          <div class="index__module__title">
            <CustomFont color="#999" size="1.4rem">
              这是我构思、设计与开发的个人网站，它也是我的实验室。
            </CustomFont>
            <CustomFont color="#666" size="1.8rem">
              "模块化"是中心设计思想。
            </CustomFont>
          </div>
          <div class="index__module__area">
            <LayoutRow :gutter="16">
              <LayoutCol
                v-for="item in moduleList"
                :key="item.id"
                :xs="{span:24}"
                :sm="{span:24}"
                :md="{span:12}"
                :lg="{span:12}"
                :xl="{span:8}"
              >
                <ItemModule :item="item" />
              </LayoutCol>
            </LayoutRow>
          </div>
        </div>
      </SliderItem>
    </Slider>
    <LayoutFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'index',
  async asyncData ({ $axios, query }) {
  },
  data () {
    return {
      state: {
        currentPage: 1
      }
    }
  },
  computed: {
    ...mapGetters(['moduleList'])
  },
  mounted () {
  },
  methods: {},
  head () {
    return {
      title: '主页',
      meta: [
        { hid: 'index', name: 'description', content: this.$getSeoInfo('description', '我的时间轴') }
      ]
    }
  }
}
</script>
