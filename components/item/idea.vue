<style lang="scss">
  .idea-item {
    padding: 32px;

    &__content {
      letter-spacing: 2px;
      color: #666;
      line-height: 1.6;

      &:first-letter {
        font-size: 1.85rem;
        padding-right: 0.2em;
      }

    }

    &__info {
      letter-spacing: 1px;
      margin-top: 10px;
      padding-top: 10px;
      line-height: 1.5;
      border-top: 1px dotted #dddddd;
      color: #999;
    }

    @media ($screen-xs-max) {
      padding: 20px;
    }

  }
</style>

<template>
  <nuxt-link :to="`/idea/${item.id}`">
    <card class="idea-item">
      <div class="idea-item__content">
        {{ item.content }}
      </div>
      <div class="idea-item__info">
        {{ item.name }}
        <br>
        <small>
          {{ $time(item.datetime).format('YYYY-MM-DD') }} / {{ $time(item.datetime).fromNow() }}
        </small>
      </div>
    </card>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ItemIdea',
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
