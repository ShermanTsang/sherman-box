<style lang="scss">
  .movie {
    &__header {
      position: relative;
      padding: 80px 0;
      overflow: hidden;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px #f0f1f2;
      background-image: linear-gradient( 135deg, rgb(130,130,130) 0%,rgb(103,103,103) 75% );

      &__poster {
        &__image {
          overflow: hidden;
          max-height: 405px;
          max-width: 270px;
          box-shadow: 0 45px 100px rgba(0, 0, 0, 0.4);

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        &__name {
          color: #fff;
          text-shadow: 0 0 10px rgba(0, 0, 0, .5);
          cursor: default;
          font-size: 1.5rem;
          padding: 0 10px;
          text-align: center;
          letter-spacing: 2px;
        }
      }

      &__main {
        display: block;
        max-width: 400px;

        &__item {
          font-size: 1.1rem;
          align-self: flex-start;
          letter-spacing: 2px;
          padding: 10px;
          cursor: default;
          color: #ffffff;
          text-shadow: 0 0 6px rgba(0, 0, 0, .4);

          &:not(:first-child) {
            border-top: 1px solid rgba(255, 255, 255, .2);
          }
        }
      }
    }
  }
</style>

<template>
  <div class="movie">
    <div class="movie__header">
      <div class="movie__header__poster">
        <div class="movie__header__poster__image">
          <img :src="$getOssUrl(data.movieItem.image)" cross-origin="anonymous">
        </div>
        <blocker height="20px" />
        <div class="movie__header__poster__name">
          {{ data.movieItem.name }}{{ data.movieItem.memo ? ` ${data.movieItem.memo}` : '' }}
        </div>
      </div>
      <blocker width="100px" />
      <div class="movie__header__main">
        <div v-if="data.movieItem.type" class="movie__header__main__item">
          <icon name="category" /> {{ data.movieItem.type }}
        </div>
        <div v-if="data.movieItem.score" class="movie__header__main__item">
          <icon name="star" /> {{ data.movieItem.score }}分
        </div>
        <div v-if="data.movieItem.people" class="movie__header__main__item">
          <icon name="user" /> {{ data.movieItem.people }}
        </div>
        <div v-if="data.movieItem.site" class="movie__header__main__item">
          <icon name="location" /> {{ data.movieItem.site }}
        </div>
        <div v-if="data.movieItem.datetime" class="movie__header__main__item">
          <icon name="clock" /> {{ $time(data.movieItem.datetime).format('YYYY-MM-DD') }} / {{ $time(data.movieItem.datetime).fromNow() }}
        </div>
      </div>
    </div>
    <template v-if="data.movieItem.schedule">
      <blocker height="60px" />
      <container class="movie__content" :max-width="1060">
        <nameplate title="追剧" sub-title="binge-watching" />
        <tag>{{ data.movieItem.schedule }}</tag>
      </container>
    </template>
    <blocker height="60px" />
    <container class="movie__content" :max-width="1060">
      <nameplate title="想法" sub-title="thinking" />
      <markdown :content="data.movieItem.comment || ''" />
    </container>
    <blocker height="40px" />
    <container :max-width="1060">
      <comment :data="data.movieItem.comments" />
    </container>
    <blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ $axios, params }) {
    const { data: movieItem } = await $axios.$get(`/api/movies/${params.id}`)
    return {
      data: {
        movieItem
      }
    }
  },
  mounted() {
    this.renderGradientColor('.movie__header')
  },
  methods: {
    renderGradientColor(selector) {
      try {
        this.$grade(document.querySelectorAll(selector))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
