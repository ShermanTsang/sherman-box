<style lang="scss">
  .comment-item {
    position: relative;

    &__parent {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      padding: 16px;
      transition: all 300ms ease-in-out;
      margin-bottom: 10px;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 20px;
        bottom: 20px;
        width: 2px;
        background-color: #efefef;
      }

      &__avatar {
        margin-right: 16px;
        align-self: flex-start;
      }

      &__main {
        width: 100%;
        overflow: hidden;

        &__username {
          color: #333333;
          font-size: 0.95rem;
          cursor: default;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          &__contact {
            font-size: .8rem;
            color: #999;

            &:before {
              content: '|';
              color: #ccc;
              padding: 0 4px;
            }
          }
        }

        &__content {
          color: #666666;
          letter-spacing: 2px;
          font-size: 0.9rem;
          padding: 10px 0;
          line-height: 1.6;
        }

        &__footer {
          color: #999999;
          font-size: 0.8rem;

          &__reply {
            letter-spacing: 1px;
            display: none;
            cursor: pointer;
            float: right;
          }
        }

        &:hover {
          .comment-item__parent__main__footer__reply {
            display: inline-block;
          }
        }

      }
    }

    &__reply {
      margin-top: 16px;
      margin-left: 40px;
    }

    &:hover {
      box-shadow: 0 0 8px rgba(0, 0, 0, .1) inset;
    }

  }

  .comment-item--reply {
    &__parent {
      padding: 10px;
      margin-bottom: 0;
    }
  }
</style>

<template>
  <div class="comment-item" :class="{'comment-item--reply': level === 'reply'}">
    <div class="comment-item__parent">
      <div class="comment-item__parent__avatar">
        <Avatar :value="item.qq || item.email" size="36px" @click="redirectByUrl(item.website)" />
      </div>
      <div class="comment-item__parent__main">
        <div
          class="comment-item__parent__main__username"
          :style="{cursor: item.website? 'pointer' : 'default'}"
          @click="redirectByUrl(item.website)"
        >
          {{ item.username }}
          <Icon v-if="item.website" name="click" color="#999" />
          <span v-if="item.qq || item.email || item.wechat" class="comment-item__parent__main__username__contact">
            <template v-if="item.qq"><Icon name="qq" size=".8rem" /> {{ item.qq }}</template>
            <template v-if="item.email"><Icon name="mail" size=".8rem" /> {{ item.email }}</template>
            <template v-if="item.wechat"><Icon name="wechat" size=".8rem" /> {{ item.wechat }}</template>
          </span>
        </div>
        <div class="comment-item__parent__main__content">
          {{ item.content }}
        </div>
        <div class="comment-item__parent__main__footer">
          <Datetime :time="item.datetime" from-now type="datetime" />
          <span class="comment-item__parent__main__footer__reply" @click="$emit('clickReplyBtn',item)">
            回复
          </span>
        </div>
      </div>
    </div>
    <div v-if="showReplies && item.replies && item.replies.length > 0" class="comment-item__reply">
      <ItemComment
        v-for="replyItem in item.replies"
        :key="replyItem.id"
        :item="replyItem"
        level="reply"
        @clickReplyBtn="$emit('clickReplyBtn',replyItem)"
      ></ItemComment>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemComment',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    level: {
      type: String,
      default: 'parent',
      validator (value) {
        return ['parent', 'reply'].includes(value)
      }
    },
    showReplies: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    redirectByUrl (url) {
      if (url) {
        window.open(url)
      }
    }
  }
}
</script>
