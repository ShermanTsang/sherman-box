<style lang="scss">
  .comment {

    &__list {
      &__item {
        display: flex;
        align-items: flex-start;
        margin: 1rem 0;
        padding: 10px;
        transition: all 300ms ease-in-out;
        border-bottom: 1px solid #EEEEEE;

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

    &__modal {
      position: fixed;
      background-color: rgba(0, 0, 0, .15);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      &__container {
        width: 90%;
        height: auto;
        overflow: hidden;
        max-width: 500px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #efefef;
        box-shadow: 0 0 30px rgba(0, 0, 0, .2);

        &__header {
          border-bottom: 1px solid #eee;
          font-size: 1.15rem;
          letter-spacing: 2px;
          color: $theme-color;
          padding: 20px;

          &__close {
            color: #999;
            float: right;
            transition: all .2s ease-in-out;
            cursor: pointer;

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        &__form {
          padding: 20px;

          &__item {
            &:not(:first-child) {
              margin-top: 16px;
            }

            label {
              letter-spacing: 2px;
              color: #666;
              font-size: 1rem;
              display: block;
              margin-bottom: 10px;
            }

            input {
              width: 100%;
              font-size: 1rem;
              padding: 0 10px;
              line-height: 34px;
              border: none;
              border-bottom: 1px solid #ddd;
            }

          }
        }

        &__footer {
          button {
            cursor: pointer;
            width: 100%;
            height: 100%;
            border: none;
            line-height: 48px;
            color: #fff;
            letter-spacing: 2px;
            @include gradient-background;
          }
        }
      }

    }

  }
</style>

<template>
  <div class="comment">
    <nameplate title="评论" sub-title="comment">
      <button @click="status.showModal = true">
        写评论
      </button>
    </nameplate>
    <div v-for="item in data.commentList" :key="item.id" class="comment__list">
      <div class="comment__list__item">
        <div class="comment__list__item__avatar">
          <img :src="$getAvatarUrl(item.qq ? 'qq': (item.email? 'email' : ''))">
        </div>
        <div class="comment__list__item__main">
          <div class="comment__list__item__main__username" @click="item.site ? redirectByUrl(item.site) : ''">
            {{ item.username }}
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
    <div v-if="status.showModal" class="comment__modal">
      <div class="comment__modal__container">
        <div class="comment__modal__container__header">
          <icon name="comment" size="30" />
          写评论
          <span class="comment__modal__container__header__close">
            <icon name="close" @click="status.showModal = false" />
          </span>
        </div>
        <div class="comment__modal__container__form">
          <div class="comment__modal__container__form__item">
            <label for="username">昵称</label>
            <input id="username" v-model="form.username" required>
          </div>
          <div class="comment__modal__container__form__item">
            <label for="qq">QQ/微信</label>
            <input id="qq" v-model="form.qq">
          </div>
          <div class="comment__modal__container__form__item">
            <label for="email">邮箱</label>
            <input id="email" v-model="form.email">
          </div>
          <div class="comment__modal__container__form__item">
            <label for="website">网站</label>
            <input id="website" v-model="form.website">
          </div>
          <div class="comment__modal__container__form__item">
            <label for="comment">内容</label>
            <input
              id="comment"
              v-model="form.comment"
              required
              minlength="4"
              maxlength="500"
            >
          </div>
        </div>
        <div class="comment__modal__container__footer">
          <Button @click="submitSendComment()">
            发送
          </Button>
        </div>
      </div>
    </div>
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
      status: {
        showModal: false
      },
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
      const appendParams = { module: this.module, id: this.id, isDisplay: 1, fromUrl: this.$route.path }
      const newComment = Object.assign(this.form, appendParams)
      this.$axios.$post('/api/comments', newComment)
        .then((response) => {
          this.data.commentList.push(response.data)
          this.form = {}
          this.status.showModal = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
