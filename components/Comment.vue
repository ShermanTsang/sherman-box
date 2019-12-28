<style lang="scss">
  .comment {

    &__list {
      &__item {
        display: flex;
        align-items: flex-start;
        padding: 16px;
        transition: all 300ms ease-in-out;

        &:not(:first-child) {
          border-top: 1px solid #eee;
        }

        &__avatar {
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
    <Nameplate title="评论" sub-title="comment">
      <Btn @click="status.showModal = true">
        写评论
      </Btn>
    </Nameplate>
    <div class="comment__list">
      <div v-for="item in data.commentList" :key="item.id" class="comment__list__item">
        <div class="comment__list__item__avatar">
          <Avatar :sign="item.qq || item.email" @click="redirectByUrl(item.website)" size="48px" />
        </div>
        <div class="comment__list__item__main">
          <div @click="redirectByUrl(item.website)" class="comment__list__item__main__username">
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
    <Tip v-if="data.commentList.length === 0">
      暂无评论
    </Tip>
    <Modal v-model="status.showModal" title="写评论" icon="comment" width="500px">
      <Loading v-if="status.isLoadingSubmit" :fix="true">
        评论发送中
      </Loading>
      <FormItem
        v-model="form.username"
        @changeValidate="valid => status.validate.username = valid"
        validate="required|max:12"
        label="昵称"
        name="username"
        type="input"
        placeholder="该如何称呼你呢？"
      />
      <FormItem
        v-model="form.contact"
        @changeValidate="valid => status.validate.contact = valid"
        label="联系方式"
        name="contact"
        type="input"
        validate="required|max:30"
        placeholder="QQ / Wechat / Email"
      >
        <span slot="tip" v-if="contactType">使用 {{ contactType }} 作为联系方式</span>
      </FormItem>
      <FormItem
        v-model="form.website"
        @changeValidate="valid => status.validate.website = valid"
        label="个人网站"
        name="website"
        type="input"
        validate="url|max:60"
        placeholder="可填写你的网站、博客、微博或其他社媒地址"
      />
      <FormItem
        v-model="form.comment"
        @changeValidate="valid => status.validate.comment = valid"
        label="内容"
        name="comment"
        type="input"
        validate="required|max:30|min:4"
        placeholder="留下你的想法、疑问、评论或回忆"
      />
      <FormItem
        v-if="['qq','email'].includes(contactType)"
        label="显示头像"
        name="avatar"
        type="custom"
      >
        <Avatar :sign="form.contact" size="60px" />
      </FormItem>
      <Btn slot="footer" :full-width="true" :colorful="true" @click="submitSendComment()" height="48px">
        发送
      </Btn>
    </Modal>
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
        showModal: false,
        isLoadingSubmit: false,
        validate: {
          username: false,
          contact: false,
          website: true,
          comment: false
        }
      },
      form: {},
      formError: {},
      data: {
        commentList: []
      }
    }
  },
  computed: {
    contactType() {
      const { contact = '' } = this.form
      const contactTypeList = {
        email: contact.indexOf('@') !== -1,
        wechat: /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(contact),
        qq: /^[1-9][0-9]{4,9}$/gim.test(contact)
      }
      for (const key in contactTypeList) {
        if (contactTypeList[key] === true) {
          return key
        }
      }
      return false
    }
  },
  mounted() {
    this.data.commentList = this.sourceData
  },
  methods: {
    redirectByUrl(url) {
      if (url) {
        window.open(url)
      }
    },
    submitSendComment() {
      if (this.$checkFormValidate(this.status.validate)) {
        this.status.isLoadingSubmit = true
        const { contact } = this.form
        const appendParams = {
          module: this.module,
          id: this.id,
          isDisplay: 1,
          fromUrl: this.$route.path,
          wechat: this.contactType === 'wechat' ? contact : '',
          qq: this.contactType === 'qq' ? contact : '',
          email: this.contactType === 'email' ? contact : ''
        }
        const newComment = { ...this.form, ...appendParams }
        this.$axios.$post('/api/comments', newComment)
          .then((response) => {
            this.data.commentList.push(response.data)
            this.form = {}
            this.status.showModal = false
            this.status.isLoadingSubmit = false
            this.errors.clear()
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$message.error('表单有错误')
      }
    }
  }
}
</script>
