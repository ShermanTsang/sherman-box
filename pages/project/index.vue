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
      background-image: linear-gradient(hsla(0, 0%, 20%, 0), hsla(0, 0%, 20%, .4));
    }

    &__text {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      padding: 20px;
      color: #ffffff;
      z-index: 50;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
      word-wrap: break-word;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0, transparent 100%);

      span {
        letter-spacing: 2px;
        line-height: 1.8;
        background: rgba(0, 0, 0, .2);
        display: inline;
        padding: 4px 10px;
        transition: all 0.3s ease-in-out;
      }
    }

    &__image {
      overflow: hidden;
      height: 340px;
      transition: all .3s ease-in-out;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

    }

    &:hover {
      .project-card {
        &__image {
          transform: scale(1.02);
        }

        &__text {
          span{
            background: rgba(0, 0, 0, .5);
          }
        }
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
              <div class="project-card__text">
                <span style="font-size: .95rem;">
                  {{ item.category.name }} / {{ item.type }}
                </span>
                <blocker height="4px" />
                <span style="font-size: 1.2rem;">
                  {{ item.name }}
                </span>
                <blocker height="6px" />
                <span style="font-size: .85rem;">
                  {{ item.status }}{{ item.progress !== 100 ? `（${item.progress}%）` : '' }}  · {{ $time(item.datetime_start).format('YYYY-MM-DD') }} {{ $time(item.datetime_start).fromNow() }}
                </span>
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
