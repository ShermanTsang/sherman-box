<style lang="scss">
  .idea {

    &__header {
      position: relative;
      overflow: hidden;

      &__title {
        letter-spacing: 2px;
        font-size: 1.45rem;
      }

      &__info {
        max-width: 600px;
        letter-spacing: 1px;
        font-size: 1rem;
        color: #999;
      }

      &__image {
        margin-top: 40px;
        width: 100%;
        height: 400px;
        background-position: center center;
        background-size: cover;
      }

    }

    &__content {
      color: #666;

      &__main {
        &:first-letter {
          font-size: 1.45rem;
          padding-right: 0.2em;
        }
      }
    }

  }
</style>

<template>
  <div class="idea">
    <layout-container class="idea__header">
      <Blocker height="60px" />
      <div class="idea__header__title">
        {{ data.ideaItem.name }}
      </div>
      <Blocker height="20px" />
      <div class="idea__header__info">
        <Moment format="YYYY-MM-DD" from-now :time="data.ideaItem.datetime" />
      </div>
      <div
        v-if="data.ideaItem.image"
        v-lazy:background-image="$getOssUrl(data.ideaItem.image)"
        class="idea__header__image"
      >
      </div>
    </layout-container>
    <Blocker height="20px" />
    <layout-container class="idea__content">
      <Markdown :content="data.ideaItem.content" class="idea__content__main" />
    </layout-container>
    <Blocker height="60px" />
    <layout-container>
      <Comment :id="data.ideaItem.id" module="idea" :source-data="data.ideaItem.comments" />
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
    return {
      title: `${this.data.ideaItem.name} - ${this.data.ideaItem.category.name} - 想法`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${this.data.ideaItem.description || ''}`)
        }
      ]
    }
  },
  async asyncData({ $axios, params }) {
    const { data: ideaItem } = await $axios.$get(`/api/ideas/${params.id}`)
    return {
      data: {
        ideaItem
      }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
