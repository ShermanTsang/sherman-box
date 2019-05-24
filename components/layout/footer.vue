<style lang="scss">
  .footer {
    padding: 30px 0;
    border-top: 1px solid #eee;
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      &__page {
        &__item {
          cursor: pointer;
          display: inline-block;
          font-size: 1rem;

          &:not(:last-child) {
            margin-right: 20px;
          }
        }

      }

      &__info {

      }
    }
  }
</style>

<template>
  <footer class="footer">
    <container class="footer__container">
      <div class="footer__container__page">
        <div v-for="item in $store.getters.pageCollection" :key="item.id" class="footer__container__page__item">
          <nuxt-link :to="{path:`/page/${item.url}`,params:{id:item.id,url:item.url}}">
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
      <div class="footer__container__info">
      </div>
    </container>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>
