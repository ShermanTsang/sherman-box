<style lang="scss">
  .common-item {
    position: relative;
    padding: 16px;
    margin: 20px 0;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    font-size: 1rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    &__main {
      flex: 0 0 60%;

      &__name {
        display: inline-block;
        font-size: 1rem;
        letter-spacing: 2px;
        padding-bottom: 5px;
        border-bottom: 2px solid #efefef;

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
      height: 80px;
      width: 80px;
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

</style>

<template>
  <card class="common-item">
    <div class="common-item__main">
      <nuxt-link :to="link" class="clock">
        <div class="common-item__main__name">
          <span class="common-item__main__name__module">
            {{ module.name }}
          </span>
          {{ name }}
        </div>
      </nuxt-link>
      <div class="common-item__main__info">
        <moment format="YYYY.MM.DD" :time="date" />
        <template v-if="item.module === 'project' || item.module==='plan'">
          ~
          <moment format="YYYY.MM.DD" :time="item.datetime_end" />
        </template>
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
    }
  },
  data() {
    return {
      config: {
        day: {
          name: '日迹', date: 'date'
        },
        blog: {
          name: '博文', date: 'datetime'
        },
        movie: {
          name: '观影', date: 'datetime'
        },
        project: {
          name: '项目', date: 'datetime_start'
        },
        plan: {
          name: '计划', date: 'datetime'
        },
        idea: {
          name: '想法', date: 'datetime'
        },
        mailbox: {
          name: '邮局', date: 'datetime'
        }
      }
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
