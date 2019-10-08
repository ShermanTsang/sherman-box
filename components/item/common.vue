<style lang="scss">
  .common-item {
    position: relative;
    margin: 10px 0;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    font-size: 1rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 120px;

    &__main {
      padding: 16px;
      overflow: hidden;
      flex: 1;
      width: 0;

      &__name {
        display:block;
        overflow: hidden;
        font-size: 1rem;
        padding-bottom: 6px;
        border-bottom: 1px solid #efefef;
        white-space: nowrap;
        text-overflow: ellipsis;
        letter-spacing: 1px;

        small {
          color: #999;
        }
      }

      &__info {
        color: #999999;
        font-size: .9rem;
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;

        &__detail {

          &__item {
            display: inline-flex;
            width: 30%;
            flex-flow: row nowrap;
            align-items: center;
            cursor: default;
            font-size: .95rem;
            margin: 6px 0;
            justify-content: left;

            i {
              font-size: 1rem;
              margin-right: 6px;
              color: #ccc;
            }

          }
        }
      }
    }

    &__module {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0,0,0,.3);
      color: #fff;
      padding: 2px 6px;
      letter-spacing: 1px;
      font-size: .9rem;
      z-index: 99;
    }

    &__image {
      flex: 0 0 120px;
      opacity: .5;
      transition: all .2s ease-in-out;
      cursor: pointer;

      img {
        height: 120px;
        width: 120px;
        border-radius: 2px;
        object-fit: cover;
        box-shadow: 0 0 6px rgba(0, 0, 0, .1);
      }
    }

    &:hover {
      .common-item {
        &__image {
          opacity: 1;
        }
      }
    }

  }

  .common-item--right {
    .common-item {
      &__main {
        order: 0;
      }

      &__image {
        order: -1;
      }

      &__module {
        left: 0;
        right: unset;
      }
    }
  }
</style>

<template>
  <Card class="common-item" :class="{'common-item--right':align === 'right'}">
    <div class="common-item__module">
      {{ module.name }}
    </div>
    <div class="common-item__main">
      <div class="common-item__main__name">
        <nuxt-link :to="link">
          {{ item.name }}
        </nuxt-link>
      </div>
      <div v-if="text === 'date'" class="common-item__main__info">
        <Moment format="YYYY.MM.DD" :time="item[module.dateField]" />
      </div>
      <div v-else-if="text === 'detail'" class="common-item__main__info">
        {{ item.text }}
      </div>
    </div>
    <div v-if="item.image" class="common-item__image" @click="$router.push(link)">
      <img v-lazy="$getOssUrl(item.image)">
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ItemDay',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    align: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value)
      },
      default: 'left'
    },
    text: {
      type: String,
      validator(value) {
        return ['date', 'detail'].includes(value)
      },
      default: 'date'
    }
  },
  data() {
    return {
      config: this.$getModuleConfig()
    }
  },
  computed: {
    module() {
      return this.config[this.item.module]
    },
    link() {
      return `/${this.item.module}/` + (this.item.module === 'day' ? `${this.$time(this.item.datetime).format('YYYY-MM-DD')}` : `${this.item.id}`)
    }
  }
}
</script>
