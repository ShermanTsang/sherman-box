<style lang="scss">
  .movie-item {
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
        bottom: 6px;
        right: 6px;
        text-align: center;
        font-size: 1rem;
        color: #fff;
        z-index: 50;
        padding: 2px 6px;
        box-sizing: border-box;
        text-shadow: 4px 4px 10px rgba(0, 0, 0, .4);
        opacity: .8;
        transition: all .3s ease-in-out;
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        z-index: 40;
        background-color: hsla(0, 0%, 20%, 0);
        background-image: linear-gradient(hsla(0, 0%, 20%, 0), hsla(0, 0%, 20%, .50));
      }

    }

    &__content {
      overflow: hidden;
      position: relative;
      padding: 10px 20px;

      &__name {
        overflow: hidden;
        line-height: 1.4;
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
        font-size: .8rem;
        overflow: hidden;
        line-height: 1.5;
        padding-left: 1px;
        white-space: nowrap;
        text-overflow: ellipsis;

        a {
          color: #999999;
        }

      }
    }

    &:hover {
      .movie-item {
        &__poster {

          img {
            transform: scale(1.05);
          }

          &__overlay {
            background-color: transparent;
            background-image: none;
          }

          &__score {
            background: none;
            font-weight: 800;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .9);
          }
        }

        &__content {
        }
      }
    }
  }
</style>

<template>
  <card
    class="movie-list__item movie-item"
  >
    <div class="movie-item__poster">
      <img v-lazy="$getOssUrl(item.image)">
      <div class="movie-item__poster__score">
        {{ item.score }}
      </div>
      <nuxt-link :to="`/movie/${item.id}`">
        <div class="movie-item__poster__overlay"></div>
      </nuxt-link>
    </div>
    <div class="movie-item__content">
      <div class="movie-item__content__name">
        <small>{{ item.category.name }}</small>
        <br>
        <nuxt-link :to="`/movie/${item.id}`">
          {{ item.name }}{{ item.memo ? ` ${item.memo}` : '' }}
        </nuxt-link>
      </div>
      <blocker height="20px" divider />
      <div class="movie-item__content__info">
        <icon name="user" size=".8rem" />
        {{ item.people }}
        <br>
        <icon name="clock" size=".8rem" />
        {{ $time(item.datetime).format('YYYY-MM-DD') }} / {{ $time(item.datetime).fromNow() }}
      </div>
    </div>
  </card>
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
