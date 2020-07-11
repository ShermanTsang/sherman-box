<style lang="scss">
.item-module {
  padding: 24px;
  cursor: pointer;

  &__image {

  }

  &__main {
    &__name {
      color: #666;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: 1.1rem;
      letter-spacing: 2px;

      i {
        margin-right: 10px;
      }
    }

    &__description {
      color: #999;
    }

    &__statistics {
      color: #999;
    }

  }
}
</style>

<template>
  <Card class="item-module" @click="$router.push(`/${item.url}`)">
    <div class="item-module__main">
      <div class="item-module__main__name">
        <Icon :name="item.icon" size="26px" color="#999" />
        <CustomFont color="#666">
          {{ item.name }}
        </CustomFont>
      </div>
      <Blocker divider height="20px" />
      <div class="item-module__main__description">
        <CustomFont color="#999">
          {{ item.description }}
        </CustomFont>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ItemModule',
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
