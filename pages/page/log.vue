<style lang="scss">
  .log {

    &__list {
      position: relative;
      min-height: 400px;
      &__item {
        letter-spacing: 1px;
        padding: 16px;
        line-height: 2;

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
        <div v-for="item in data.commitList" :key="item.sha" class="log__list__item">
          <div class="log__list__item__info">
            {{ $time(item.commit.author.date).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <div class="log__list__item__main" v-html="(item.commit.message || 'no specific message').replace(/\n/g,'<br>')">
          </div>
          <div class="log__list__item__info">
            {{ item.sha }}
          </div>
        </div>
      </template>
    </div>
    <Blocker height="40px" />
  </LayoutContainer>
</template>

<script>
export default {
  head() {
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
  },
  data() {
    return {
      data: {
        commitList: []
      },
      status: {
        isLoading: false
      }
    }
  },
  mounted() {
    this.getGithubCommitLog()
  },
  methods: {
    getGithubCommitLog() {
      this.status.isLoading = true
      const sessionCache = sessionStorage.getItem('developCommit')
      if (sessionCache) {
        this.data.commitList = JSON.parse(sessionCache)
        this.status.isLoading = false
        return
      }
      this.queryGithubCommitLog()
      this.status.isLoading = false
    },
    async queryGithubCommitLog() {
      this.status.isLoading = true
      const commitList = await this.$axios.$get('https://api.github.com/repos/ShareManT/ShareManBox-Nuxt/commits')
      this.data.commitList = commitList
      sessionStorage.setItem('developCommit', JSON.stringify(commitList))
      this.status.isLoading = false
    }
  }
}
</script>
