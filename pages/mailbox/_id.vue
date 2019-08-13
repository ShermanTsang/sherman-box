<style lang="scss">
  .mailbox {
    &__header {
      position: relative;
      width: 100%;
      height: 400px;
      overflow: hidden;

      &__image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        opacity: .8;
        transform: scale(1.2);
        filter: blur(4px);
        width: 100%;
        height: 100%;
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
        box-shadow: 0 -20px 20px 40px rgb(255, 255, 255) inset;
      }

      &__text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: center;
        color: #fff;
        cursor: default;
        padding: 0 20px;
        text-shadow: 0 0 8px rgba(0, 0, 0, .8);

        &__title {
          letter-spacing: 2px;
          font-size: 1.6rem;
        }

        &__info {
          max-width: 600px;
          letter-spacing: 1px;
          font-size: 1rem;
        }
      }
    }
  }
</style>

<template>
  <div class="mailbox">
    <div class="mailbox__header">
      <div v-lazy:background-image="$getOssUrl(data.mailboxItem.image)" class="mailbox__header__image">
      </div>
      <layout-container class="mailbox__header__text">
        <div class="mailbox__header__text__title">
          {{ data.mailboxItem.name }}
        </div>
        <blocker height="20px" />
        <div class="mailbox__header__text__info">
          <icon name="clock" />
          <moment format="YYYY-MM-DD" :time="data.mailboxItem.datetime" from-now />
        </div>
      </layout-container>
    </div>
    <blocker height="20px" />
    <layout-container class="mailbox__content">
      <!--      <markdown :content="data.mailboxItem.content" />-->
    </layout-container>
    <blocker height="60px" />
    <layout-container>
      <comment :id="data.mailboxItem.id" module="mailbox" :data="data.mailboxItem.comments" />
    </layout-container>
    <blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title: `${this.data.mailboxItem.name} - ${this.data.mailboxItem.category.name} - 邮盒`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${this.data.mailboxItem.description || ''}`)
        }
      ]
    }
  },
  async asyncData({ $axios, params }) {
    const { data: mailboxItem } = await $axios.$get(`/api/mailboxes/${params.id}`)
    return {
      data: {
        mailboxItem
      }
    }
  }
}
</script>
