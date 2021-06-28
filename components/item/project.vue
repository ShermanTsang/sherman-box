<style lang="scss">
.project-item {
  @apply h-[360px];

  &__image {
    @apply h-full w-full absolute z-1;

    img {
      @apply object-cover h-full w-full;
    }
  }

  &__overlay {
    @apply from-transparent bg-gradient-to-b to-[rgba(0,0,0,.5)] absolute h-full w-full z-2 opacity-50;
  }

  &__text {
    @apply tracking-[1px] absolute text-[#fff] bottom-4 left-4 z-3 leading-relaxed;
  }
}
</style>

<template>
  <Card
    class="project-item"
  >
    <nuxt-link :to="`/project/${item.id}`">
      <div class="project-item__image">
        <img v-lazy="$getOssUrl(item.image)">
      </div>
      <div class="project-item__overlay"></div>
      <div class="project-item__text">
        <span class="text-md">
          {{ item.category.name }} / {{ item.type }}
        </span>
        <Blocker height="4px" />
        <span class="text-base">
          {{ item.name }}
        </span>
        <Blocker height="6px" />
        <span class="text-sm opacity-80">
          {{ item.state }}{{
            item.progress !== 100 ? `（${item.progress}%）` : ''
          }}  · {{ $time(item.datetime_start).format('YYYY-MM-DD') }} {{ $time(item.datetime_start).fromNow() }}
        </span>
      </div>
    </nuxt-link>
  </Card>
</template>

<script>
export default {
  name: 'ItemProject',
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
