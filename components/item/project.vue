<style lang="scss">
</style>

<template>
  <nuxt-link :to="`/project/${item.id}`">
    <Card class="h-[360px] group">
      <div class="h-full w-full absolute z-1 overflow-hidden">
        <img v-lazy="$getOssUrl(item.image)" class="object-cover h-full w-full filter transition duration-300 ease-linear transform group-hover:(blur-[4px] scale-110)">
      </div>
      <div class="from-transparent bg-gradient-to-b to-[rgba(0,0,0,.5)] absolute h-full w-full z-2 opacity-50"></div>
      <div class="tracking-[1px] absolute text-[#fff] bottom-4 left-4 z-3 leading-relaxed">
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
    </Card>
  </nuxt-link>
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
