<style lang="scss">
.footer {

  &__main {
    //box-shadow: 0 4px 4px 1px rgba(177,177,177, .1) inset,0 -4px 4px 1px rgba(177,177,177, .1) inset;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    background-color: #ffff;
    padding: 48px 0;

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      @media ($screen-xs-max) {
        align-items: center;
        flex-flow: column nowrap;
        line-height: 2;
      }

      &__column {
        &__item {
          cursor: pointer;
          display: inline-block;
          font-size: .95rem;
          color: #666;
          letter-spacing: 1px;
          transition: all .2s ease-in-out;

          &:not(:first-child) {

            &:before {
              font-size: .9rem;
              content: '/';
              padding: 0 6px;
              font-weight: bold;
              color: #efefef;
            }
          }

          i {
            margin-left: 10px;
            transition: color .2s ease-in-out;
            color: #999;

            &:hover {
              color: #666;
            }
          }

          &__name {
            display: inline-block;
            font-size: 0;
          }

          &:hover {
            .footer__main__container__column__item__name {
              font-size: 1rem;
            }
          }

        }
      }
    }

  }

  &__info {
    padding: 20px 0;

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      @media ($screen-xs-max) {
        flex-flow: column nowrap;
        line-height: 2;
        align-items: center;
      }

      &__item {
        font-size: .9rem;
        color: #999;
      }

    }
  }

}
</style>

<template>
  <footer class="footer">
    <div class="footer__main">
      <LayoutContainer class="footer__main__container">
        <div class="footer__main__container__column">
          <div
            v-for="item in $store.getters.pageList"
            :key="item.id"
            class="footer__main__container__column__item"
            @click="redirectToPage(item)"
          >
            <CustomText display="inline-block">
              {{ item.name }}
            </CustomText>
          </div>
        </div>
        <div class="footer__main__container__column">
          <div
            v-for="item in data.socialMediaList"
            :key="item.id"
            class="footer__main__container__column__item"
            @click="redirectToPage(item)"
          >
            <Icon :name="item.icon" size="20px" />
            <div class="footer__main__container__column__item__name">
              {{ item.name }}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
    <div class="footer__info">
      <LayoutContainer class="footer__info__container">
        <div class="footer__info__container__item">
          <CustomText>
            <a href="https://beian.miit.gov.cn/" rel="nofollow" target="_blank">{{ $getConfig('site.name') }}</a>
            <Datetime :link-with-timeline="false" format="2011-YYYY" :time="new Date().toDateString()" />
          </CustomText>
        </div>
        <div class="footer__info__container__item">
          <a href="https://beian.miit.gov.cn/" rel="nofollow" target="_blank">
            <CustomText>{{ $getConfig('site.icp') }}</CustomText>
          </a>
        </div>
      </LayoutContainer>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
  data () {
    return {
      data: {
        socialMediaList: [
          { icon: 'weibo', name: '微博', url: this.$getConfig('socialMedia.weibo') },
          { icon: 'zhihu', name: '知乎', url: this.$getConfig('socialMedia.zhihu') },
          { icon: 'px', name: '500PX', url: this.$getConfig('socialMedia.500px') },
          { icon: 'bilibili', name: 'bilibili', url: this.$getConfig('socialMedia.bilibili') },
          { icon: 'github', name: 'GitHub', url: this.$getConfig('socialMedia.github') },
          { icon: 'lark', name: '语雀', url: this.$getConfig('socialMedia.lark') }
        ]
      }
    }
  },
  methods: {
    redirectToPage (item) {
      if (item.isExtra) {
        window.open(`/${item.url}`)
        return
      }
      if (item.url.includes('://')) {
        window.open(`${item.url}`)
        return
      }
      this.$router.push({ name: 'page-url', params: { type: 'page', id: item.id, url: item.url } })
    }
  }
}
</script>
