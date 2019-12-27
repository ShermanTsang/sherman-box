<style lang="scss">
  .mail-item {
    position: relative;
    border: none !important;
    margin-top: 230px;
    background: none;

    &__header {
      position: absolute;
      z-index: $z-index-card-background;
      top: -200px;
      width: 100%;
      transition: all 0.3s ease-in-out;

      &__image {
        overflow: hidden;
        height: 230px;
        margin: 0 20px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all .2s ease-in-out;
          filter: grayscale(40%) contrast(80%);
          border-radius: 8px 8px 0 0;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1)
        }
      }
    }

    &__content {
      position: relative;
      z-index: $z-index-card-content;
      background: #ffffff;
      line-height: 2;
      padding: 32px;
      font-size: 1rem;
      color: #666666;
      letter-spacing: 1px;
    }

    &__pin {
      position: absolute;
      color: #999;
      bottom: 20px;
      right: 20px;
      z-index: $z-index-card-action;
    }

    &:hover {
      .mail-item {
        &__header {
          top: -220px;

          img {
            -webkit-filter: unset;
            filter: unset;
          }
        }

        &__content {
          &::before {
            position: absolute;
            width: 100%;
            height: 10px;
            content: '';
            left: 0;
            right: 0;
            top: -10px;
            background: linear-gradient(45deg, #f25953 12.5%, #fbfaf5 12.5%, #fbfaf5 25%, #5590d6 25%, #5590d6 37.5%, #fbfaf5 37.5%, #fbfaf5 50%, #f25953 50%, #f25953 62.5%, #fbfaf5 62.5%, #fbfaf5 75%, #5590d6 75%, #5590d6 87.5%, #fbfaf5 87.5%, #fbfaf5 100%);
            background-size: 70px 70px;
          }
        }
      }

    }
  }
</style>

<template>
  <Card
    class="mailbox-list__item mailbox-item"
  >
    <div class="card mail-item">
      <div class="mail-item__header">
        <nuxt-link nuxt-link :to="`/mailbox/${item.id}`">
          <div class="mail-item__header__image">
            <img :src="$getOssUrl(item.image)">
          </div>
        </nuxt-link>
      </div>
      <div class="mail-item__content">
        <nuxt-link nuxt-link :to="`/mailbox/${item.id}`">
          <span>From</span> {{ item.from }}
          <span>To</span> {{ item.to }}
        </nuxt-link>
        <br>
        <div class="divider"></div>
        <icon name="comment" /> {{ item.category.name }} / {{ item.name }}
        <br>
        <icon name="clock" />
        <Datetime format="YYYY-MM-DD" :time="item.datetime" />
      </div>
      <div v-if="item.password || item.hint" class="mail-item__pin">
        <icon name="lock" />
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ItemMailbox',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
