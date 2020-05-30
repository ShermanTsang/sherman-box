<style lang="scss">
  .log {

    &__list {
      position: relative;

      &__item {
        position: relative;
        letter-spacing: 1px;
        padding: 32px;
        line-height: 2;
        transition: all .2s ease-in-out;
        cursor: pointer;
        overflow: hidden;

        &:hover {
          box-shadow: 0 0 16px rgba(177, 177, 177, .2) inset;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #eee;
        }

        &__name {
          color: #333;
          font-size: 1rem;

          span {
            padding: 4px 10px;
            font-size: .95rem;
            background-color: rgba($theme-color, .1);
            color: $theme-color;
          }
        }

        &__info {
          color: #999;
          font-size: .95rem;
        }

        &__main {
          color: #666;
          font-size: .95rem;
        }

        &__image {
          width: 400px;
          max-width: 100%;
          border: 1px solid #ddd;
          margin: 10px 0;
        }
      }

      &__action {
        padding: 16px;
        text-align: center;
        background-color: rgba(59, 166, 234, 0.1);
        color: $theme-color;
        letter-spacing: 2px;
        cursor: pointer;
      }
    }

  }
</style>

<template>
  <LayoutContainer class="log">
    <Blocker height="40px" />
    <Nameplate title="开发日志" sub-title="develop log" />
    <Blocker height="40px" />
    <Tabs :tabs="[{text:'网站更新日志',name:'log'},{text:'代码版本日志',name:'github'}]" @select="changeTab">
      <div slot="log" class="log__list">
        <Loading v-if="status.isLoading" :fix="true">
          正在加载网站更新日志...
        </Loading>
        <template v-if="data.updateList && data.updateList.length > 0">
          <div
            v-for="item in data.updateList"
            :key="item.id"
            class="log__list__item"
          >
            <div class="log__list__item__name">
              <span>{{ item.category.name || '无分类' }}</span> {{ item.name }}
            </div>
            <div class="log__list__item__image">
              <Pic :url="item.image"></Pic>
            </div>
            <div class="log__list__item__main">
              {{ item.description }}
              <Markdown :content="item.content || ''" />
            </div>
            <div class="log__list__item__info">
              <Datetime :time="item.datetime" from-now type="datetime" />
            </div>
          </div>
        </template>
        <Blocker height="40px" />
        <Pagination
          v-if="meta.last_page > 1"
          type="log"
          :page="parseInt(meta.current_page)"
          :total="parseInt(meta.total)"
          :size="parseInt(meta.per_page)"
          @change="requestUpdateLog"
        />
      </div>
      <div slot="github" class="log__list">
        <Loading v-if="status.isLoading" :fix="true">
          正在从Github拉取日志...
        </Loading>
        <template v-if="data.githubCommitList && data.githubCommitList.length > 0">
          <div
            v-for="item in data.githubCommitList"
            :key="item.sha"
            class="log__list__item"
            @click="openGithubCommitDetailPage(item.sha)"
          >
            <div class="log__list__item__info">
              <Datetime :time="item.commit.author.date" from-now type="datetime" />
            </div>
            <div
              class="log__list__item__main"
              v-html="(item.commit.message || 'no specific message').replace(/\n/g,'<br>')"
            >
            </div>
            <div class="log__list__item__info">
              <small>SHA: {{ item.sha }}</small>
            </div>
          </div>
        </template>
        <div class="log__list__action" @click="requestGithubCommitLog()">
          <Icon name="more" size="1.2rem" />
        </div>
      </div>
    </Tabs>
    <Blocker height="40px" />
  </LayoutContainer>
</template>

<script>
export default {
  data () {
    return {
      data: {
        githubCommitList: [],
        updateList: []
      },
      status: {
        isLoading: false,
        currentGithubListPage: 0,
        source: 'log'
      },
      meta: {}
    }
  },
  mounted () {
    this.requestUpdateLog()
  },
  methods: {
    async requestGithubCommitLog () {
      this.status.isLoading = true
      const requestPage = this.status.currentGithubListPage + 1
      const githubCommitList = await this.$axios.$get('https://api.github.com/repos/ShareManT/ShareManBox-Nuxt/commits', {
        params: {
          page: requestPage
        }
      })
      this.data.githubCommitList = [...this.data.githubCommitList, ...githubCommitList]
      this.status.currentGithubListPage++
      this.status.isLoading = false
    },
    async requestUpdateLog (pageNum) {
      this.status.isLoading = true
      const { data: updateList, meta } = await this.$axios.$get('/api/logs', {
        params: {
          page: pageNum
        }
      })
      this.data.updateList = updateList
      this.meta = meta
      this.status.isLoading = false
    },
    openGithubCommitDetailPage (sha) {
      window.open(`https://github.com/ShareManT/ShareManBox-Nuxt/commit/${sha}`)
    },
    changeTab ({ name }) {
      this.status.activeTab = name
      name === 'log' ? this.requestUpdateLog() : this.requestGithubCommitLog()
    }
  },
  head () {
    return {
      title: '更新日志 - 页面',
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', '更新日志')
        }
      ]
    }
  }
}
</script>
