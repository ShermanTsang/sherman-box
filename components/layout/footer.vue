<style lang="scss">
  .footer {
    padding: 30px 20px;
    border-top: 1px solid #eee;
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      font-size: .95rem;

      &__page {
        &__item {
          cursor: pointer;
          display: inline-block;

          a {
            color: #666;
          }

          &:not(:last-child) {
            margin-right: 20px;
          }
        }
      }

      &__info {
        color: #999;
      }
    }

    @media ($screen-size-xs) {
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
