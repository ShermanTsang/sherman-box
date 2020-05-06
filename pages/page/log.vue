<style lang="scss">
  .log {

    &__list {
      position: relative;

      &__item {
        letter-spacing: 1px;
        padding: 32px;
        line-height: 2;
        transition: all .2s ease-in-out;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 16px rgba(177, 177, 177, .2) inset;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #eee;
        }

        &__info {
          color: #999;
          font-size: .95rem;
        }

        &__main {
          color: #666;
          font-size: 1rem;
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
    <div class="log__list">
      <Loading v-if="status.isLoading" :fix="true">
        正在从Github拉取日志...
      </Loading>
      <template v-if="data.commitList && data.commitList.length > 0">
        <div
          v-for="item in data.commitList"
          :key="item.sha"
          class="log__list__item"
          @click="openCommitDetailPage(item.sha)"
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
    <Blocker height="40px" />
  </LayoutContainer>
</template>

<script>
export default {
  data () {
    return {
      data: {
        commitList: []
      },
      status: {
        isLoading: false,
        currentPage: 0
      }
    }
  },
  mounted () {
    this.requestGithubCommitLog()
  },
  methods: {
    async requestGithubCommitLog () {
      this.status.isLoading = true
      const requestPage = this.status.currentPage + 1
      const commitList = await this.$axios.$get('https://api.github.com/repos/ShareManT/ShareManBox-Nuxt/commits', {
        params: {
          page: requestPage
        }
      })
      this.data.commitList = [...this.data.commitList, ...commitList]
      this.status.currentPage++
      this.status.isLoading = false
    },
    openCommitDetailPage (sha) {
      window.open(`https://github.com/ShareManT/ShareManBox-Nuxt/commit/${sha}`)
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
