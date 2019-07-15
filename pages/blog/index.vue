<style lang="scss">
  .blog-list {
    &__item {
      margin-bottom: 20px;
    }
  }

  .blog-card {
    height: 400px;
    position: relative;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    font-size: 1rem;

    &__image {
      cursor: pointer;
      height: 240px;
      background-position: center center;
      background-size: cover;
      transition: all 200ms ease-in;
      opacity: .8;
      transform: scale(1.25);
      box-shadow: 0 -20px 20px 30px rgb(255, 255, 255) inset;
    }

    &__main {
      position: absolute;
      top: 190px;
      left: 0;
      right: 0;
      margin-top: 20px;
      padding: 20px;

      &__title {
        display: inline-block;
        font-size: 1.2rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        border-bottom: 2px solid #efefef;
      }

      &__description {
        color: #999999;
        margin-top: 10px;
        line-height: 2;
        font-size: .95rem;
        overflow: hidden;
      }
    }

    &:hover {
      .blog-card__image {
        opacity: 1;
      }
    }

    @media only screen and (max-width: 600px) {
      &__image {
      }
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.blogCollection" class="blog-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.blogCollection"
          :key="item.id"
          class="gutter-row"
          :md="24"
          :lg="12"
          :xl="8"
        >
          <card
            class="blog-list__item blog-card"
          >
            <nuxt-link :to="`/blog/${item.id}`">
              <div v-lazy:background-image="$getOssUrl(item.image)" :to="`/blog/${item.id}`" class="blog-card__image">
              </div>
            </nuxt-link>
            <div class="blog-card__main">
              <div class="blog-card__main__title">
                <nuxt-link :to="`/blog/${item.id}`">
                  {{ item.name }}
                </nuxt-link>
              </div>
              <div class="blog-card__main__description">
                <template v-if="item.description">
                  {{ item.description.length > 40 ? `${item.description.substring(0,40)}...` : item.description }}
                </template>
                <blocker height="6px" />
                <small>{{ $time(item.datetime).format('YYYY-MM-DD') }} / {{ $time(item.datetime).fromNow() }}</small>
              </div>
            </div>
          </card>
        </a-col>
      </a-row>
    </div>
    <blocker height="40px" />
    <pagination
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <blocker height="40px" />
  </container>
</template>

<script>
export default {
  data() {
    return {}
  },
  async asyncData({ $axios, query }) {
    const { data: blogCollection, meta } = await $axios.$get(`/api/blogs`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        blogCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'blog', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
