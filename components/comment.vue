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

    &__form {
      /*display: none;*/
      &__item {
        &:not(:first-child) {
          margin-top: 16px;
        }

        label {
          letter-spacing: 1px;
          color: #666;
          font-size: 1rem;
          display: block;
          margin-bottom: 10px;
        }

        input {
          width: 100%;
          height: 34px;
          font-size: 1rem;
          line-height: 34px;
          border: none;
          border-bottom: 1px solid #ccc;
        }

        button {
          width: 100%;
          border: none;
          line-height: 40px;
          color: #fff;
          letter-spacing: 2px;
          @include gradient-background;
        }
      }
    }

  }
</style>

<template>
  <div class="comment">
    <nameplate title="评论" sub-title="comment" />
    <div v-for="item in data.commentList" :key="item.id" class="comment__list">
      <div class="comment__list__item">
        <div class="comment__list__item__avatar">
          <img :src="$getAvatarUrl(item.qq ? 'qq': (item.email? 'email' : ''))">
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
    <template v-if="test">
      <layout-row>
        <layout-col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}" :xl="{span:8}">
          <div class="comment__form">
            <div class="comment__form__item">
              <label for="username">昵称</label>
              <input id="username" v-model="form.username">
            </div>
            <div class="comment__form__item">
              <label for="qq">QQ/微信</label>
              <input id="qq" v-model="form.qq">
            </div>
            <div class="comment__form__item">
              <label for="website">网站</label>
              <input id="website" v-model="form.website">
            </div>
            <div class="comment__form__item">
              <Button @click="submitSendComment()">
                发送
              </Button>
            </div>
          </div>
        </layout-col>
        <layout-col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}" :xl="{span:10}">
          <div class="comment__form">
            <div class="comment__form__item">
              <label for="comment">内容</label>
              <input id="comment" v-model="form.comment">
            </div>
          </div>
        </layout-col>
      </layout-row>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    module: {
      type: String,
      default: ''
    },
    id: {
      type: [String, Number],
      default: ''
    },
    sourceData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      test: false,
      form: {},
      data: {
        commentList: []
      }
    }
  },
  mounted() {
    this.data.commentList = this.sourceData
  },
  methods: {
    redirectByUrl(url) {
      window.open(url)
    },
    submitSendComment() {
      const appendParams = { module: this.module, id: this.id }
      const newComment = Object.assign(this.form, appendParams)
      this.$axios.$post('/api/comments', newComment)
        .then((response) => {
          this.data.commentList.push(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
