<style lang="scss">
  .list {
    &__item {
      margin: 20px 0;
      &__title{
        letter-spacing: 2px;
        font-size: 1rem;
      }
      &__image {
        width: 100px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>

<template>
  <layout-container>
    <div class="list">
      <card
        v-for="item in data.blogCollection"
        :key="item.id"
        class="list__item"
        :image="$getImageUrl(item.image)"
      >
        <div class="list__item__title">
          <nuxt-link :to="`/blog/${item.id}`">
            {{ item.title }}
          </nuxt-link>
        </div>
        <div class="list__item__image">
          <img :src="$getImageUrl(item.image)">
        </div>
        <div class="list__item__content">
          {{ item.description }}
        </div>
      </card>
    </div>
  </layout-container>
</template>

<script>
export default {
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
