<style lang="scss">
  .idea-list {
    column-count: 3;
    column-gap: 0;

    &__item {
      box-sizing: border-box;
      break-inside: avoid;
      padding: 10px;
    }
  }

  .idea-card {
    padding: 16px;

    &__content {
      letter-spacing: 2px;
      color: #666;
      line-height: 1.5;

      &:first-letter {
        font-size: 1.6rem;
        padding-right: 0.1em;
      }
    }

    &__info {
      letter-spacing: 1px;
      margin-top: 10px;
      padding-top: 10px;
      line-height: 1.5;
      border-top: 1px dotted #dddddd;
      color: #999;
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.ideaCollection" class="idea-list">
      <div
        v-for="item in data.ideaCollection"
        :key="item.id"
        class="idea-list__item"
      >
        <nuxt-link :to="`/idea/${item.id}`">
          <card class="idea-card">
            <div class="idea-card__content">
              {{ item.content }}
            </div>
            <div class="idea-card__info">
              {{ item.name }}
              <br>
              <small>
                {{ $time(item.datetime).format('YYYY-MM-DD') }} / {{ $time(item.datetime).fromNow() }}
              </small>
            </div>
          </card>
        </nuxt-link>
      </div>
    </div>
    <blocker height="40px" />
    <pagination
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <blocker height="40px" />
  </container>
</template>

<script>
export default {
  data() {
    return {}
  },
  async asyncData({ $axios, query }) {
    const { data: ideaCollection, meta } = await $axios.$get(`/api/ideas`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        ideaCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'idea', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
