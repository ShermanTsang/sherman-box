<style lang="scss">
  .movie-list {
    &__item {
      margin-bottom: 20px;
    }
  }

  .movie-card {
    overflow: hidden;

    &__poster {
      position: relative;
      height: 280px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .2s ease-in-out;
      }

      &__score {
        position: absolute;
        bottom: 5px;
        right: 5px;
        border-radius: 50%;
        text-align: center;
        font-size: 1.1rem;
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        z-index: 50;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, .4);
        opacity: .8;
        background-color: #08AEEA;
        transition: all .3s ease-in-out;
      }

      &__overlay {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 40;
      }

    }

    &__content {
      overflow: hidden;
      position: relative;
      padding: 20px;

      &__name {
        overflow: hidden;
        line-height: 1.2;
        font-size: 1rem;
        letter-spacing: 2px;
        white-space: nowrap;
        text-overflow: ellipsis;

        a {
          color: #666666;
        }

        small {
          color: #999999;
          letter-spacing: 1px;
        }
      }

      &__info {
        letter-spacing: 1px;
        color: #999999;
        font-size: .85rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        i {
          font-size: .9rem;
        }

        a {
          color: #999999;
        }

      }
    }

    &:hover {
      .movie-card__poster {
        img {
          transform: scale(1.1);
          -ms-transform: scale(1.1);
          -webkit-transform: scale(1.1)
        }
        &__overlay {
          background-color: transparent;
          background-image: none;
        }

        &__score {
          background: none;
          font-size: 1.1rem;
          font-weight: 800;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, .9);
        }
      }
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.movieCollection" class="movie-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.movieCollection"
          :key="item.id"
          class="gutter-row"
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <card
            class="movie-list__item movie-card"
          >
            <div class="movie-card__poster">
              <img v-lazy="$getImageUrl(item.image)">
              <div class="movie-card__poster__score">
                {{ item.score }}
              </div>
              <div class="movie-card__poster__overlay"></div>
            </div>
            <div class="movie-card__content">
              <div class="movie-card__content__name">
                <nuxt-link :to="`/movie/${item.id}`">
                  {{ item.name }}{{ item.memo ? ` ${item.memo}` : '' }}
                </nuxt-link>
                <br>
                <small>{{ item.type }}{{ item.category ? ` / ${item.category}`: '' }}</small>
              </div>
              <blocker height="20px" divider />
              <div class="movie-card__content__info">
                {{ item.people }}
                <br>
                {{ $time(item.datetime).format('YYYY-MM-DD') }} / {{ $time(item.datetime).fromNow() }}
              </div>
            </div>
          </card>
        </a-col>
      </a-row>
    </div>
    <blocker height="40px" />
    <pagination :page="meta.current_page" :total="meta.total" :size="meta.per_page" @change="changePage" />
    <blocker height="40px" />
  </container>
</template>

<script>
export default {
  data() {
    return {}
  },
  async asyncData({ $axios, query }) {
    const { data: movieCollection, meta } = await $axios.$get(`/api/movies`, {
      params: {
        page_size: 12,
        page: query.page
      }
    })
    return {
      data: {
        movieCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'movie', query: { page: currentPage } })
    }
  },
  watchQuery: ['page']
}
</script>
