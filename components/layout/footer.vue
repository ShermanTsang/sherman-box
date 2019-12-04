<style lang="scss">
  .footer {
    margin-left: $sidebar-width;
    background-color: #ffffff;
    padding: 30px 10px;
    border-top: 1px solid #eee;

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      &__page {
        &__item {
          cursor: pointer;
          display: inline-block;
          font-size: .95rem;
          color: #999;
          letter-spacing: 2px;

          a {
            color: #999;
          }

          &:not(:last-child) {
            margin-right: 20px;
          }
        }
      }

      &__info {
        font-size: .9rem;
        color: #999;
      }
    }

    @media ($screen-xs-max) {
      margin-left: 0;

      &__container {
        flex-flow: column nowrap;
        font-size: .9rem;

        &__page {
          &__item {
            &:not(:last-child) {
              margin-right: 14px;
            }
          }
        }

        &__info {
          margin-top: 10px;
        }
      }
    }

  }
</style>

<template>
  <footer class="footer">
    <layout-container class="footer__container">
      <div class="footer__container__page">
        <div v-for="item in $store.getters.pageList" :key="item.id" class="footer__container__page__item" @click="redirectToPage(item)">
          {{ item.name }}
        </div>
      </div>
      <div class="footer__container__info">
        {{ $getConfig('site.icp') }}
      </div>
    </layout-container>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
  methods: {
    redirectToPage(item) {
      if (item.isExtra) {
        window.open(`/page/${item.url}`)
        return
      }
      this.$router.push({ name: 'page-url', params: { type: 'page', id: item.id, url: item.url } })
    }
  }
}
</script>
