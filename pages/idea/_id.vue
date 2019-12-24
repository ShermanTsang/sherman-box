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
    <LayoutContainer class="idea__header">
      <Blocker height="60px" />
      <div class="idea__header__title">
        {{ data.ideaItem.name }}
      </div>
      <Blocker height="20px" />
      <div class="idea__header__info">
        <Datetime format="YYYY-MM-DD" from-now :time="data.ideaItem.datetime" />
      </div>
      <div
        v-if="data.ideaItem.image"
        v-lazy:background-image="$getOssUrl(data.ideaItem.image)"
        class="idea__header__image"
      >
      </div>
    </LayoutContainer>
    <Blocker height="20px" />
    <LayoutContainer class="idea__content">
      <Markdown :content="data.ideaItem.content" class="idea__content__main" />
    </LayoutContainer>
    <Blocker height="60px" />
    <LayoutContainer>
      <Comment :id="data.ideaItem.id" module="idea" :source-data="data.ideaItem.comments" />
    </LayoutContainer>
    <Blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    const { name, category, description } = this.data.ideaItem
    return {
      title: `${name} - ${category.name} - 想法`,
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
    const { data: ideaItem } = await $axios.$get(`/api/ideas/${params.id}`)
    store.commit('currentItem', ideaItem)
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
