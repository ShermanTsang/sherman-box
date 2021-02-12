<style lang="scss">
  .idea-item {
    padding: 32px;
    cursor: pointer;
    border: 1px solid #efefef;
    margin: 16px 0;

    &__content {
      letter-spacing: 2px;
      color: #666;
      line-height: 1.6;
      font-size: .98rem;

      &:first-letter {
        font-size: 1.6rem;
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
  <Card class="idea-item" @click="$router.push(`/idea/${item.id}`)">
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
  </Card>
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
