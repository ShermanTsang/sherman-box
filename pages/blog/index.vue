<style lang="scss">
  .list {
    margin-top: 40px;
    &__item {
      margin-bottom: 20px;
    }
  }

  .blog-card {
    position: relative;
    padding: 20px;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    font-size: 1rem;
    display: flex;
    flex-flow: row nowrap;

    &__main {
      flex: 0 0 60%;
      height: 140px;

      &__title {
        display: inline-block;
        font-size: 1rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        border-bottom: 2px solid #efefef;
      }

      &__description {
        color: #999999;
        font-size: .9rem;
        margin-top: 5px;
        overflow: hidden;
      }
    }

    &__image {
      flex: 0 0 40%;
      transform: translateX(10px);
      position: absolute;
      right: 0;
      top: 0;
      width: 240px;
      height: 100%;
      background-position: center center;
      background-size: cover;
      -webkit-transition: all 200ms ease-in;
      transition: all 200ms ease-in;
      opacity: .3;

      &::after {
        content: '';
        position: absolute;
        top: -34px;
        bottom: 0;
        left: -2px;
        width: 0;
        height: 0;
        border-top: 240px solid transparent;
        border-left: 50px solid #fff;
      }
    }

    &:hover {
      .blog-card__image {
        opacity: 1;
        transform: none;
      }
    }

    @media only screen and (max-width: 600px) {
      flex: 0 0 80%;
      &__image {
        flex: 0 0 20%;
        width: 180px;
      }
    }
  }
</style>

<template>
  <container>
    <div class="list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.blogCollection"
          :key="item.id"
          class="gutter-row"
          :md="24"
          :lg="12"
          :xl="12"
        >
          <card
            class="list__item blog-card"
            :image="$getImageUrl(item.image)"
          >
            <div class="blog-card__main">
              <div class="blog-card__main__title">
                <nuxt-link :to="`/blog/${item.id}`">
                  {{ item.title }}
                </nuxt-link>
              </div>
              <div class="blog-card__main__description">
                {{ item.description }}
              </div>
            </div>
            <div class="blog-card__image" :style="`background-image: url('${$getImageUrl(item.image)}')`">
            </div>
          </card>
        </a-col>
      </a-row>
    </div>
  </container>
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
