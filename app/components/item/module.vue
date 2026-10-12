<style lang="scss">
</style>

<template>
  <Card
    class="group w-full h-[240px] relative overflow-hidden p-6 space-y-4 cursor-pointer"
    @click="$router.push(`/${item.url}`)"
  >
    <div class="flex flex-row text-lg text-[#333] flex-nowrap items-center space-x-2">
      <Icon :name="item.icon" size="26px" color="#999" />
      <CustomText color="#666">
        {{ item.name }}
      </CustomText>
    </div>
    <div class="text-[#999]">
      <CustomText color="#999">
        {{ item.description }}
      </CustomText>
    </div>
    <Lottie
      v-if="item.animation_icon"
      :name="item.animation_icon"
      :height="180"
      :width="180"
      class="max-md:transform max-md:scale-[.6] max-md:-right-8 max-md:-bottom-8 absolute -right-1 -bottom-1 opacity-30 transition duration-200 ease-linear group-hover:opacity-100"
    />
  </Card>
</template>

<script setup>
import { useLegacyOptions } from '~/composables/useLegacyOptions'

import { toRefs as __toRefs } from 'vue'

const __legacyOptions = {

}

defineOptions({ name: "ItemModule" })

const legacyProps = defineProps({
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })

const { item } = __toRefs(legacyProps)

useLegacyOptions(__legacyOptions, legacyProps)
</script>
