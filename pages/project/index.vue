<style lang="scss">
  .project-list {
    &__item {
      margin-bottom: 20px;
    }
  }

  .project-card {
    position: relative;
    overflow: hidden;

    &__overlay {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 40;
      background-color: hsla(0, 0%, 20%, 0);
      background-image: linear-gradient(hsla(0, 0%, 20%, 0), hsla(0, 0%, 20%, .50));
    }

    &__header {
      position: absolute;
      width: 90%;
      top: 10px;
      border-left: 3px solid rgba(255, 255, 255, .3);
      padding: 0 10px;
      margin: 10px 20px;
      font-weight: 500;
      color: #ffffff;
      z-index: 50;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
      word-wrap: break-word;

      .project-text {
        letter-spacing: 2px;
        line-height: 1.6;
        background: rgba(0, 0, 0, .2);
        display: inline;
        padding: 2px 5px;
        transition: all 0.3s ease-in-out;
      }
    }

    &__footer {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 60px 10px 10px 10px;
      z-index: 50;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
      font-size: .9rem;
      word-wrap: break-word;
      color: #dddddd;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0, transparent 100%);
    }

    &__image {
      overflow: hidden;
      height: 340px;
      transition: all .3s ease-in;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &:hover {
      &__image {
        transform: scale(1.1);
      }

      .project-text {
        background: rgba(0, 0, 0, .5);
      }
    }

    &--disable {
      pointer-events: none;
      cursor: default;
      opacity: 0.6;
      filter: grayscale(1);
    }
  }
</style>

<template>
  <container>
    <blocker height="40px" />
    <div v-if="data.projectCollection" class="project-list">
      <a-row :gutter="16">
        <a-col
          v-for="item in data.projectCollection"
          :key="item.id"
          class="gutter-row"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
        >
          <card
            class="project-list__item project-card"
          >
            <nuxt-link :to="`/project/${item.id}`">
              <div class="project-card__image">
                <img v-lazy="$getOssUrl(item.image)">
              </div>
              <div class="project-card__overlay"></div>
              <div class="project-card__header">
                <div class="project-text" style="font-size: .95rem;">
                  {{ item.type }} / {{ item.category }}
                </div>
                <blocker height="4px" />
                <div class="project-text" style="font-size: 1.2rem;">
                  {{ item.name }}
                </div>
              </div>
              <div class="project-card__footer">
                {{ item.status }}{{ item.progress !== 100 ? `（${item.progress}%）` : '' }}
                <span class="right"> · {{ $time(item.datetime_start).format('YYYY-MM-DD') }} {{ $time(item.datetime_start).fromNow() }}</span>
              </div>
            </nuxt-link>
          </card>
        </a-col>
      </a-row>
    </div>
    <blocker height="40px" />
    <pagination :page="parseInt(meta.current_page)" :total="parseInt(meta.total)" :size="parseInt(meta.per_page)" @change="changePage" />
    <blocker height="40px" />
  </container>
</template>

<script>
export default {
  data() {
    return {}
  },
  async asyncData({ $axios, query }) {
    const { data: projectCollection, meta } = await $axios.$get(`/api/projects`, {
      params: {
        page: query.page
      }
    })
    return {
      data: {
        projectCollection
      },
      meta
    }
  },
  mounted() {
  },
  methods: {
    changePage(currentPage) {
      this.$router.push({ name: 'project', query: { page: parseInt(currentPage) } })
    }
  },
  watchQuery: ['page']
}
</script>
