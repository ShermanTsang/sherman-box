<style lang="scss">
.word-item {
  padding: 20px;
  cursor: pointer;
  border: 1px solid #efefef;
  margin: 16px 0;

  &__content {
    letter-spacing: 2px;
    color: #666;
    line-height: 1.6;
    font-size: .98rem;
  }

  @media ($screen-xs-max) {
    padding: 20px;
  }

}
</style>

<template>
  <Card class="word-item" @click="$router.push(`/word/${item.id}`)">
    <div
      class="leading-2 pb-2 mb-2 relative"
      :class="{'border-solid border-b border-gray-200' : item.is_private === 0}"
    >
      <span class="text-gray-600 text-base">{{ item.person }}</span>
      <br>
      <span class="text-gray-400 text-sm">#{{ item.category.name }}</span>
      <br>
      <span class="text-gray-400 text-xs">
        {{ $time(item.date).format('YYYY-MM-DD') }} · {{ $time(item.date).fromNow() }}
      </span>
      <div v-if="item.is_private === 1" class="absolute right-2 top-2">
        <Icon name="lock" />
      </div>
    </div>
    <div v-if="item.is_private === 0" class="word-item__content">
      <Markdown :content="item.content" />
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ItemWord',
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
