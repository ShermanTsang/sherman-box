<style lang="scss">
  .movie-item {
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;

    &__header {
      position: relative;
      width: 100%;
      height: 320px;
      overflow: hidden;

      &__poster {
        position: absolute;
        left: 0;
        right: 0;
        top: 30px;
        bottom: 0;
        z-index: $z-index-card-content;
        margin: 0 auto;
        width: 200px;
        height: 270px;
        cursor: pointer;
        box-shadow: 0 0 20px rgba(0,0,0,.2);

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all .2s ease-in-out;
        }
      }

      &__background {
        z-index: $z-index-card-background;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: .4;
        background-position: center center;
        background-size: cover;
        box-shadow: 0 -40px 30px 40px #fff inset;
        filter: blur(6px);
        transform: scale(1.3);
      }

    }

    &__content {
      overflow: hidden;
      position: relative;
      padding: 16px 32px;

      &__name {
        text-align: center;
        overflow: hidden;
        line-height: 1.4;
        font-size: 1.1rem;
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
        line-height: 2.2;

        &__item {
          letter-spacing: 1px;
          color: #999999;
          font-size: .9rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          a {
            color: #999999;
          }
        }

      }
    }

    &:hover {
      .movie-item {
        &__header {

          img {
            transform: scale(1.05);
          }

          &__background {
            background-color: transparent;
            background-image: none;
          }

        }

        &__content {
        }
      }
    }

    @media ($screen-md-max) {

      &__content {
        padding: 20px;
      }
    }

  }
</style>

<template>
  <Card
    class="movie-list__item movie-item"
  >
    <div class="movie-item__header">
      <div class="movie-item__header__poster" @click="$router.push(`/movie/${item.id}`)">
        <img v-lazy="$getOssUrl(item.image)">
      </div>
      <div v-lazy:background-image="$getOssUrl(item.image)" class="movie-item__header__background"></div>
    </div>
    <div class="movie-item__content">
      <div class="movie-item__content__name">
        <nuxt-link :to="`/movie/${item.id}`">
          {{ item.name }}
          <small v-if="item.memo">{{ item.memo }}</small>
        </nuxt-link>
      </div>
      <Blocker height="30px" divider divider-height="2px" divider-width="100px" />
      <div class="movie-item__content__info">
        <div class="movie-item__content__info__item">
          <icon name="category" size=".9rem" />
          {{ item.category.name }}
        </div>
        <div class="movie-item__content__info__item">
          <icon name="star" size=".9rem" />
          {{ item.score ? `${item.score}分` : '待评分' }}
        </div>
        <div class="movie-item__content__info__item">
          <icon name="user" size=".9rem" />
          {{ item.people || 'ShareMan' }}
        </div>
        <div class="movie-item__content__info__item">
          <icon name="clock" size=".9rem" />
          <Datetime from-now :time="item.datetime" type="date" />
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ItemMovie',
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
