<style lang="scss">
  .list {
    &__item {
      margin: 20px 0;
      &__title{
        letter-spacing: 2px;
        font-size: 1rem;
      }
    }
  }
</style>

<template>
  <layout-container>
    <div class="list">
      <ui-card
        v-for="item in data.blogCollection"
        :key="item.id"
        class="list__item"
        :image="$getImageUrl(item.image)"
      >
        <div class="list__item__title">
          <nuxt-link :to="`/blog/${item.id}`">
            {{ item.title }}
            {{ $getImageUrl(item.image) }}
          </nuxt-link>
        </div>
        <div class="list__item__content"></div>
      </ui-card>
    </div>
  </layout-container>
</template>

<script>
import LayoutContainer from '../../components/layout/container'

export default {
  components: { LayoutContainer },
  data() {
    return {}
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get('/api/blogs')
    return {
      data: {
        blogCollection: data.blogCollection
      }
    }
  },
  mounted() {
  }
}
</script>
