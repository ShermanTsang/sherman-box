<style lang="scss">
  .footer {
    background-color: #ffffff;
    padding: 30px 20px;
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

          a {
            color: #666;
          }

          &:not(:last-child) {
            margin-right: 20px;
          }
        }
      }

      &__info {
        font-size: .9rem;
        color: #666;
      }
    }

    @media ($screen-xs) {
      &__container {
        flex-flow: column nowrap;
        align-items: center;
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
        <div v-for="item in $store.getters.pageCollection" :key="item.id" class="footer__container__page__item">
          <nuxt-link :to="{name:`page-url`,params:{type:'page',id:item.id,url:item.url}}">
            {{ item.name }}
          </nuxt-link>
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
  name: 'LayoutFooter'
}
</script>
