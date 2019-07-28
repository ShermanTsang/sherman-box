<style lang="scss">
  .idea {

    &__header {
      position: relative;
      width: 100%;
      overflow: hidden;

      &__title {
        letter-spacing: 2px;
        font-size: 1.6rem;
      }

      &__info {
        max-width: 600px;
        letter-spacing: 1px;
        font-size: 1rem;
      }

      &__image {
        margin-top: 40px;
        width: 100%;
        height: 400px;
        background-position: center center;

        img {
          object-fit: cover;
        }
      }

    }

    &__content {
      color: #666;
    }

  }
</style>

<template>
  <div class="idea">
    <container :max-width="1060" class="idea__header">
      <blocker height="40px" />
      <div class="idea__header__title">
        {{ data.ideaItem.name }}
      </div>
      <blocker height="10px" />
      <div class="idea__header__info">
        <clock format="YYYY-MM-DD" from-now>
          {{ data.ideaItem.datetime }}
        </clock>
      </div>
      <div v-if="data.ideaItem.image" v-lazy:background-image="$getOssUrl(data.ideaItem.image)" class="idea__header__image">
      </div>
    </container>
    <blocker height="20px" />
    <container class="idea__content" :max-width="1060">
      <markdown :content="data.ideaItem.content" />
    </container>
    <blocker height="60px" />
    <container :max-width="1060">
      <comment :data="data.ideaItem.comments" />
    </container>
    <blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title: this.$getSeoInfo('title', `${this.data.ideaItem.name} - ${this.data.ideaItem.category.name} - 想法`),
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
