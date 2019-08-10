<style lang="scss">
  .comment {
    &__list {
      &__item {
        display: flex;
        align-items: flex-start;
        margin: 1rem 0;
        padding: 10px;
        transition: all 300ms ease-in-out;

        &:not(:last-child) {
          border-bottom: 1px solid #EEEEEE;
        }

        &__avatar {
          img {
            width: 60px;
            height: 60px;
            background-color: #fff;
            border-radius: 50%;
          }

          margin-right: 20px;
        }

        &__main {
          width: 100%;
          overflow: hidden;

          &__username {
            color: #333333;
            font-size: 0.95rem;
            cursor: default;
          }

          &__content {
            color: #666666;
            letter-spacing: 2px;
            font-size: 0.9rem;
            padding: 10px 0;
          }

          &__time {
            color: #999999;
            font-size: 0.8rem;
          }
        }
      }
    }

  }
</style>

<template>
  <div class="comment">
    <nameplate title="评论" sub-title="Comment" />
    <div v-for="item in data" :key="item.id" class="comment__list">
      <div class="comment__list__item">
        <div class="comment__list__item__avatar">
          <img :src="$getAvatarUrl(item.qq ? 'qq':'email',item.qq? item.qq: item.email)">
        </div>
        <div class="comment__list__item__main">
          <div class="comment__list__item__main__username">
            <template v-if="item.site">
              <a-popconfirm placement="topLeft" ok-text="跳转" cancel-text="取消" @confirm="redirectByUrl(item.site)">
                <template slot="title">
                  跳转到 {{ item.username }} 的个人网站？
                </template>
                {{ item.username }}
              </a-popconfirm>
            </template>
            <template v-else>
              {{ item.username }}
            </template>
          </div>
          <div class="comment__list__item__main__content">
            {{ item.content }}
          </div>
          <div class="comment__list__item__main__time">
            {{ item.datetime }}
          </div>
        </div>
      </div>
    </div>
    <div class="comment__input">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {},
  methods: {
    redirectByUrl(url) {
      window.open(url)
    }
  }
}
</script>
