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
    height: 110px;

    &__main {
      padding: 16px;
      overflow: hidden;
      flex: 1 0;

      &__name {
        display:inline-block;
        overflow: hidden;
        font-size: 1rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        border-bottom: 1px solid #efefef;
        white-space: nowrap;
        text-overflow: ellipsis;

        &__module {
          font-size: .95rem;
          color: #999;
          margin-right: 6px;

          &:before {
            content: '#';
          }
        }

        small {
          color: #999;
        }
      }

      &__info {
        color: #999999;
        font-size: .9rem;
        margin-top: 10px;
        overflow: hidden;

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

    &__image {
      height: 110px;
      width: 110px;
      opacity: .5;
      transition: all .2s ease-in-out;

      img {
        border-radius: 2px;
        width: 100%;
        height: 100%;
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
    }
  }
</style>

<template>
  <card class="common-item" :class="{'common-item--right':align === 'right'}">
    <div class="common-item__main">
      <nuxt-link :to="link" class="clock">
        <div class="common-item__main__name">
          <span class="common-item__main__name__module">
            {{ module.name }}
          </span>
          {{ name }}
        </div>
      </nuxt-link>
      <div v-if="text === 'date'" class="common-item__main__info">
        <moment format="YYYY.MM.DD" :time="date" />
        <template v-if="item.module === 'project' || item.module==='plan'">
          ~
          <template v-if="item.datetime_end">
            <moment format="YYYY.MM.DD" :time="item.datetime_end" />
          </template>
          <template v-else>
            至今
          </template>
        </template>
      </div>
      <div v-else-if="text === 'detail'" class="common-item__main__info">
        detail
      </div>
    </div>
    <div v-if="item.image" class="common-item__image">
      <nuxt-link :to="link" class="clock">
        <img v-lazy="$getOssUrl(item.image)">
      </nuxt-link>
    </div>
  </card>
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
    name() {
      return this.item.module === 'day' ? `${this.$time(this.item.date).format('YYYY-MM-DD')}` : `${this.item.name}`
    },
    module() {
      return this.config[this.item.module]
    },
    date() {
      const dateField = this.module.date
      return this.item[dateField]
    },
    link() {
      return `/${this.item.module}/` + (this.item.module === 'day' ? `${this.$time(this.item.date).format('YYYY-MM-DD')}` : `${this.item.id}`)
    }
  }
}
</script>
