<style lang="scss">
  .movie {
    &__header {
      position: relative;
      width: 100%;
      padding: 60px 0;
      overflow: hidden;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;

      &__image {
        overflow: hidden;
        max-height: 475px;
        max-width: 405px;
        box-shadow: 0 45px 100px rgba(0, 0, 0, 0.4);
        img {
          border-radius: 4px;
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
        padding: 0 20px;
        letter-spacing: 2px;
      }
    }

  }
</style>

<template>
  <div class="movie">
    <div class="movie__header">
      <div class="movie__header__image">
        <img :src="$getImageUrl(data.movieItem.image)" cross-origin="anonymous">
      </div>
      <blocker height="20" />
      <div class="movie__header__name">
        {{ data.movieItem.name }}
      </div>
    </div>
    <blocker :height="60" />
    <container class="movie__content" :max-width="960">
      <markdown :content="data.movieItem.comment || ''" />
    </container>
    <blocker :height="60" />
    <container :max-width="960">
      <comment :data="data.movieItem.comments" />
    </container>
    <blocker :height="60" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/api/movies/${params.id}`)
    return {
      data: {
        movieItem: data.movieItem
      }
    }
  },
  mounted() {
    this.renderGradientColor('.movie__header')
  },
  methods: {
    renderGradientColor(selector) {
      this.$grade(document.querySelectorAll(selector))
    }
  }
}
</script>
