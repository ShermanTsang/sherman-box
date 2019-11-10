<style lang="scss">
  .project {

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

        &__description {
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
            margin: 20px 20px 0 20px;
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
  <div class="project">
    <div class="project__header">
      <layout-container class="project__header__main" max-width="900px">
        <div class="project__header__main__image">
          <img
            :src="$getOssUrl(data.projectItem.image, true)"
            crossorigin="anonymous"
            @load="$gradientColor('.project__header')"
          >
        </div>
        <Blocker height="30px" />
        <div class="project__header__main__name">
          {{ data.projectItem.name }}
        </div>
        <Blocker height="20px" />
        <div class="project__header__main__description">
          {{ data.projectItem.description || '暂无项目介绍' }}
        </div>
      </layout-container>
    </div>
    <Blocker height="60px" />
    <layout-container>
      <Nameplate title="详情" sub-title="Detail" />
      <div class="project__detail">
        <div v-if="data.projectItem.datetime_start" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="clock" />
            项目时间
          </div>
          <div class="project__detail__item__info">
            <Tag>
              始
              <Moment from-now type="datetime" :time="data.projectItem.datetime_start" />
            </tag>
            <Tag v-if="data.projectItem.datetime_end">
              终
              <Moment from-now type="datetime" :time="data.projectItem.datetime_end" />
            </tag>
          </div>
        </div>
        <div v-if="data.projectItem.category" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="category" />
            项目类型
          </div>
          <div class="project__detail__item__info">
            <Tag>{{ data.projectItem.category.name }}</tag>
          </div>
        </div>
        <div v-if="data.projectItem.tags" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="hashtag" />
            项目标签
          </div>
          <div class="project__detail__item__info">
            <Tag>{{ data.projectItem.tags }}</tag>
          </div>
        </div>
        <div v-if="data.projectItem.status" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="status" />
            项目状态
          </div>
          <div class="project__detail__item__info">
            <Tag>{{ data.projectItem.status }}</tag>
            <Tag v-if="data.projectItem.hours">
              耗时约{{ data.projectItem.hours }}小时
            </tag>
          </div>
        </div>
        <div v-if="data.projectItem.role" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="role" />
            我的角色
          </div>
          <div class="project__detail__item__info">
            <Tag>{{ data.projectItem.role }}</tag>
          </div>
        </div>
        <div v-if="data.projectItem.client" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="user-require" />
            需求委托方
          </div>
          <div class="project__detail__item__info">
            <Tag>{{ data.projectItem.client }}</tag>
          </div>
        </div>
        <div v-if="data.projectItem.coworker" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="user-helper" />
            项目协作者
          </div>
          <div class="project__detail__item__info">
            <Tag>{{ data.projectItem.coworker }}</tag>
          </div>
        </div>
        <div v-if="data.projectItem.url" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="link" />
            预览地址
          </div>
          <div class="project__detail__item__info">
            <Tag><a :href="data.projectItem.url" target="_blank">点击进入</a></tag>
          </div>
        </div>
        <div v-if="data.projectItem.github" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="github" />
            Github仓库
          </div>
          <div class="project__detail__item__info">
            <Tag><a :href="data.projectItem.github" target="_blank">点击进入</a></tag>
          </div>
        </div>
        <div v-if="data.projectItem.qrcode" class="project__detail__item">
          <div class="project__detail__item__name">
            <Icon name="github" />
            预览地址
          </div>
          <div class="project__detail__item__info">
            <img v-lazy="$getOssUrl(data.projectItem.qrcode)">
          </div>
        </div>
      </div>
    </layout-container>
    <template v-if="data.projectItem.content">
      <Blocker height="60px" />
      <layout-container>
        <Nameplate title="预览" sub-title="Preview" />
        <Markdown :content="data.projectItem.content || ''" />
      </layout-container>
    </template>
    <template v-if="data.projectItem.logs">
      <Blocker height="60px" />
      <layout-container>
        <Nameplate title="日志" sub-title="Log" />
        <Markdown :content="data.projectItem.logs || ''" />
      </layout-container>
    </template>
    <template v-if="data.projectItem.file">
      <layout-container>
        <Blocker height="60px" />
        <Nameplate title="文件" sub-title="file" />
        <iframe
          v-if="data.projectItem.file.indexOf('.ppt') !== -1 || data.projectItem.file.indexOf('.doc') !== -1"
          :src="`https://view.officeapps.live.com/op/view.aspx?src=${$getOssUrl(data.projectItem.file)}`"
          width="100%"
          height="600px"
        ></iframe>
      </layout-container>
    </template>
    <template v-if="data.projectItem.video">
      <layout-container>
        <Nameplate title="视频" sub-title="video" />
        <iframe
          height="500"
          width="100%"
          :src="data.projectItem.video"
          allowfullscreen
        ></iframe>
      </layout-container>
    </template>
    <Blocker height="60px" />
    <layout-container>
      <Comment :id="data.projectItem.id" module="project" :source-data="data.projectItem.comments" />
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
    const { name, category, description } = this.data.projectItem
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
    const { data: projectItem } = await $axios.$get(`/api/projects/${params.id}`)
    store.commit('currentItem', projectItem)
    return {
      data: {
        projectItem
      }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
