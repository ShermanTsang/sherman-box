<style lang="scss">
.word {

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
  <div class="word">
    <LayoutContainer class="word__header">
      <Blocker height="60px" />
      <div class="word__header__title relative">
        {{ data.wordItem.person }}
        <span class="text-gray-400 text-sm">#{{ data.wordItem.category.name }}</span>
        <div v-if="data.wordItem.is_private === 1" class="absolute right-2 top-2">
          <Icon name="lock" />
        </div>
      </div>
      <Blocker height="20px" />
      <div class="word__header__info">
        <Datetime :time="data.wordItem.date" format="YYYY-MM-DD" from-now />
      </div>
      <div
        v-if="data.wordItem.image"
        v-lazy:background-image="$getOssUrl(data.wordItem.image)"
        class="word__header__image"
      >
      </div>
    </LayoutContainer>
    <Blocker height="20px" />
    <LayoutContainer class="word__content">
      <Markdown :content="data.wordItem.content" class="word__content__main" />
    </LayoutContainer>
    <Blocker height="60px" />
    <LayoutContainer>
      <Comment :id="data.wordItem.id" module="word" />
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
    const { data: wordItem } = await $axios.$get(`/api/words/${params.id}`)
    store.commit('SET_CURRENT_ITEM', {
      image: wordItem.image,
      name: wordItem.person,
      category: wordItem.category,
      date: wordItem.date
    })
    return {
      data: {
        wordItem
      }
    }
  },
  head () {
    const { person, category, content } = this.data.wordItem
    return {
      title: `${person} - ${category.name} - 话语`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${content || ''}`)
        }
      ]
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
