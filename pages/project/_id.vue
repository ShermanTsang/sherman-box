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
            display: block;
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
    }
  }
</style>

<template>
  <div class="project">
    <div class="project__header">
      <LayoutContainer class="project__header__main" max-width="900px">
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
      </LayoutContainer>
    </div>
    <Blocker height="60px" />
    <LayoutContainer>
      <Nameplate title="详情" sub-title="Detail" />
      <Waterfall :column="2" gap="16px">
        <InfoCell v-if="data.projectItem.datetime_start" name="项目时间" icon="clock">
          <Tag>
            始
            <Datetime :time="data.projectItem.datetime_start" from-now type="datetime" />
          </Tag>
          <Tag v-if="data.projectItem.datetime_end">
            终
            <Datetime :time="data.projectItem.datetime_end" from-now type="datetime" />
          </Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.category" name="项目类型" icon="category">
          <Tag>{{ data.projectItem.category.name }}</Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.tags" name="项目标签" icon="hashtag">
          <Tag>{{ data.projectItem.tags }}</Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.state" name="项目状态" icon="state">
          <Tag>{{ data.projectItem.state }}</Tag>
          <Tag v-if="data.projectItem.hours">
            耗时约{{ data.projectItem.hours }}小时
          </Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.role" name="我的角色" icon="role">
          <Tag>{{ data.projectItem.role }}</Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.client" name="需求委托方" icon="user-client">
          <Tag>{{ data.projectItem.client }}</Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.coworker" name="项目协作者" icon="user-helper">
          <Tag>{{ data.projectItem.coworker }}</Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.url" name="预览地址" icon="link">
          <Tag><a :href="data.projectItem.url" target="_blank" rel="noopener">点击进入</a></Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.github" name="Github仓库" icon="github">
          <Tag><a :href="data.projectItem.github" target="_blank" rel="noopener">点击进入</a></Tag>
        </InfoCell>
        <InfoCell v-if="data.projectItem.qrcode" name="预览地址" icon="github">
          <img v-lazy="$getOssUrl(data.projectItem.qrcode)">
        </InfoCell>
      </Waterfall>
    </LayoutContainer>
    <template v-if="data.projectItem.content">
      <Blocker height="60px" />
      <LayoutContainer>
        <Nameplate title="预览" sub-title="Preview" />
        <Markdown :content="data.projectItem.content || ''" />
      </LayoutContainer>
    </template>
    <template v-if="data.projectItem.logs">
      <Blocker height="60px" />
      <LayoutContainer>
        <Nameplate title="日志" sub-title="Log" />
        <Markdown :content="data.projectItem.logs || ''" />
      </LayoutContainer>
    </template>
    <template v-if="data.projectItem.file">
      <Blocker height="60px" />
      <LayoutContainer>
        <Nameplate title="文件" sub-title="file" />
        <iframe
          v-if="data.projectItem.file.indexOf('.ppt') !== -1 || data.projectItem.file.indexOf('.doc') !== -1"
          :src="`https://view.officeapps.live.com/op/view.aspx?src=${$getOssUrl(data.projectItem.file)}`"
          width="100%"
          height="600px"
        ></iframe>
      </LayoutContainer>
    </template>
    <template v-if="data.projectItem.video">
      <Blocker height="60px" />
      <LayoutContainer>
        <Nameplate title="视频" sub-title="video" />
        <iframe
          :src="data.projectItem.video"
          height="500"
          width="100%"
          allowfullscreen
        ></iframe>
      </LayoutContainer>
    </template>
    <Blocker height="60px" />
    <LayoutContainer>
      <Comment :id="data.projectItem.id" module="project" />
    </LayoutContainer>
    <Blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, store, params }) {
    const { data: projectItem } = await $axios.$get(`/api/projects/${params.id}`)
    store.commit('SET_CURRENT_ITEM', { image: projectItem.image, name: projectItem.name, category: projectItem.category, date: projectItem.datetime_start })
    return {
      data: {
        projectItem
      }
    }
  },
  mounted () {
  },
  methods: {},
  head () {
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
  }
}
</script>
