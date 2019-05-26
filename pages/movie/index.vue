<style lang="scss">
  .movie-list {
    &__item {
      margin-bottom: 20px;
    }
  }

  .movie-card {
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;

    &__poster {
      position: relative;
      flex: 0 0 140px;
      height: 210px;
      box-shadow: 0 0 15px rgba(177, 177, 177, .6);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
      }

      &__score {
        position: absolute;
        bottom: 5px;
        right: 5px;
        border-radius: 50%;
        text-align: center;
        font-size: 1.1rem;
        width: 26px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        z-index: 50;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, .4);
        opacity: .8;
        -o-transition: all 300ms ease-in-out;
        -webkit-transition: all 300ms ease-in-out;
        transition: all 300ms ease-in-out;
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
        line-height: 1.2;
        font-size: 1.1rem;
        letter-spacing: 2px;
        white-space: nowrap;
        margin-bottom: 20px;

        a {
          color: #666666;
        }

        small {
          letter-spacing: 1px;
        }
      }

      &__info {
        margin-top: 20px;
        letter-spacing: 1px;
        color: #999999;
        font-size: .9rem;
        overflow: hidden;
        line-height: 2;

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
    <blocker :height="40" />
    <div v-if="data.movieCollection" class="movie-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.movieCollection"
          :key="item.id"
          class="gutter-row"
          :md="24"
          :lg="12"
          :xl="12"
        >
          <card
            class="movie-list__item movie-card"
            :image="$getImageUrl(item.image)"
          >
            <div class="movie-card__poster">
              <img :src="$getImageUrl(item.image)">
              <div class="movie-card__poster__score">
                {{ item.score }}
              </div>
              <div class="movie-card__poster__overlay"></div>
            </div>
            <div class="movie-card__content">
              <div class="movie-card__content__name">
                <nuxt-link :to="`/movie/${item.id}`">
                  {{ item.name }}
                </nuxt-link>
              </div>
              <div class="movie-card__content__info"></div>
            </div>
          </card>
        </a-col>
      </a-row>
    </div>
    <blocker :height="40" />
    <pagination :page="meta.current_page" :total="meta.total" @change="changePage" />
    <blocker :height="40" />
  </container>
</template>

<script>
export default {
  data() {
    return {}
  },
  async asyncData({ $axios, query }) {
    const { data, meta } = await $axios.$get(`/api/movies`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        movieCollection: data.movieCollection
      },
      meta: meta
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
