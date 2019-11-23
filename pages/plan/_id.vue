<style lang="scss">
  .plan {

    &__header {
      position: relative;
      width: 100%;
      padding: 60px 0;
      overflow: hidden;
      background-image: linear-gradient(135deg, rgb(130, 130, 130) 0%, rgb(103, 103, 103) 75%);

      &__main {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;

        &__image {
          overflow: hidden;
          width: 460px;
          height: 260px;
          box-shadow: 0 45px 100px rgba(0, 0, 0, 0.4);

          img {
            border-radius: 2px;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        &__name {
          color: #fff;
          text-shadow: 0 0 6px rgba(0, 0, 0, .5);
          cursor: default;
          font-size: 1.5rem;
          padding: 0 20px;
          letter-spacing: 2px;
        }

        &__time {
          display: block;
          color: #ffffff;
          padding: 10px;
          font-size: 1rem;
          line-height: 1.5;
          letter-spacing: 2px;
          text-shadow: 0 0 4px rgba(0, 0, 0, .5);
          border-top: 1px solid rgba(255, 255, 255, .2);
          border-bottom: 1px solid rgba(255, 255, 255, .2);
        }

        &__description {
          display: block;
          color: #ffffff;
          padding: 10px;
          font-size: 1rem;
          line-height: 1.5;
          letter-spacing: 2px;
          text-shadow: 0 0 4px rgba(0, 0, 0, .5);
        }

      }

    }

    &__detail {
      display: flex;
      flex-flow: row wrap;

      &__item {
        flex: 0 0 33.33%;
        border: 1px solid #eee;
        position: relative;
        font-size: .95rem;
        color: #666;
        height: 200px;
        margin-left: -1px;
        margin-bottom: -1px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        transition: all .3s ease-in-out;

        &__name {
          flex: 0 1 20px;
          font-size: 1rem;
          letter-spacing: 1px;
          line-height: 1.5;
          padding-bottom: 10px;
          margin: 20px 10px;
          border-bottom: 2px solid #efefef;
          transition: all .3s;

          i {
            margin-right: 1rem;
            font-size: 1.2rem;
          }
        }

        &__info {
          font-size: .85rem;
          padding: 10px;
          width: 100%;
          text-align: center;
          overflow-x: hidden;
          overflow-y: auto;

          img {
            max-height: 100px;
          }
        }

        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, .1) inset;
        }
      }
    }

    @media ($screen-xs-max) {
      &__header {
        &__main {
          &__image {
            width: 95%;
            height: 260px;
          }

          &__description {
            margin: 10px 10px 0 10px;
            padding: 20px;
          }
        }
      }
      &__detail {
        display: block;

        &__item {
          border: none;
          padding: 20px 10px;
          width: 100%;
          height: auto;
          display: block;

          &__name {
            margin: 0;
          }

          &__info {
            padding: 10px 0 0 0;
            text-align: left;
             overflow-x: unset;
             overflow-y: unset;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="plan">
    <div class="plan__header">
      <layout-container class="plan__header__main" max-width="900px">
        <div class="plan__header__main__image">
          <img
            :src="$getOssUrl(data.planItem.image, true)"
            crossorigin="anonymous"
            @load="$gradientColor('.plan__header')"
          >
        </div>
        <Blocker height="30px" />
        <div class="plan__header__main__name">
          <small>{{ data.planItem.category.name }}</small> / {{ data.planItem.name }}
        </div>
        <Blocker height="20px" />
        <div class="plan__header__main__time">
          始 <Datetime from-now type="datetime" :time="data.planItem.datetime_start" />
          <br>
          终 <Datetime from-now type="datetime" :time="data.planItem.datetime_end" />
        </div>
        <div class="plan__header__main__description">
          {{ data.planItem.description || '暂无项目介绍' }}
        </div>
      </layout-container>
    </div>
    <template v-if="data.planItem.content">
      <Blocker height="60px" />
      <layout-container>
        <Nameplate title="内容" sub-title="content" />
        <Markdown :content="data.planItem.content || ''" />
      </layout-container>
    </template>
    <template v-if="data.planItem.logs">
      <Blocker height="60px" />
      <layout-container>
        <Nameplate title="日志" sub-title="logs" />
        <Markdown :content="data.planItem.logs || ''" />
      </layout-container>
    </template>
    <Blocker height="60px" />
    <layout-container>
      <Comment :id="data.planItem.id" module="plan" :source-data="data.planItem.comments" />
    </layout-container>
    <Blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    const { name, category, description } = this.data.planItem
    return {
      title: `${name} - ${category.name} - 项目`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${description || ''}`)
        }
      ]
    }
  },
  async asyncData({ $axios, store, params }) {
    const { data: planItem } = await $axios.$get(`/api/plans/${params.id}`)
    store.commit('currentItem', planItem)
    return {
      data: {
        planItem
      }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
