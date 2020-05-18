<style lang="scss">
  .comment {

    &__list {

      &__item {
        position: relative;
        display: flex;
        align-items: flex-start;
        padding: 16px 0;
        transition: all 300ms ease-in-out;
        margin-bottom: 10px;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          height: 80%;
          width: 2px;
          background-color: #efefef;
        }

        &__avatar {
          margin: 0 16px;
          align-self: center;
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

          &__time {
            color: #999999;
            font-size: 0.8rem;
          }
        }

        &:hover {
          box-shadow: 0 0 8px rgba(0, 0, 0, .1) inset;
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
      <Loading v-if="status.isLoadingList" :fix="true">
        评论加载中
      </Loading>
      <Waterfall :column="2" gap="16px">
        <div v-for="item in data.commentList" :key="item.id" class="comment__list__item waterfall__item">
          <div class="comment__list__item__avatar">
            <Avatar :value="item.qq || item.email" size="36px" @click="redirectByUrl(item.website)" />
          </div>
          <div class="comment__list__item__main">
            <div class="comment__list__item__main__username" :style="{cursor: item.website? 'pointer' : 'default'}" @click="redirectByUrl(item.website)">
              {{ item.username }} <Icon v-if="item.website" name="click" color="#999" />
              <span v-if="item.qq || item.email || item.wechat" class="comment__list__item__main__username__contact">
                <template v-if="item.qq"><Icon name="qq" size=".8rem" /> {{ item.qq }}</template>
                <template v-if="item.email"><Icon name="mail" size=".8rem" /> {{ item.email }}</template>
                <template v-if="item.wechat"><Icon name="wechat" size=".8rem" /> {{ item.wechat }}</template>
              </span>
            </div>
            <div class="comment__list__item__main__content">
              {{ item.content }}
            </div>
            <div class="comment__list__item__main__time">
              {{ item.datetime }}
            </div>
          </div>
        </div>
      </Waterfall>
    </div>
    <Tip v-if="!status.isLoadingList && data.commentList.length === 0" asset="pic-comment" max-width="240px">
      暂无评论
    </Tip>
    <Pagination
      v-if="meta"
      type="component"
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="requestCommentList"
    />
    <Modal v-model="status.showModal" title="写评论" icon="comment" width="500px">
      <Loading v-if="status.isLoadingSubmit" :fix="true">
        评论发送中
      </Loading>
      <FormItem
        v-model="form.username"
        validate="required|maxLength:8"
        label="昵称"
        name="username"
        type="input"
        placeholder="该如何称呼你呢？"
        @changeValidate="valid => status.validate.username = valid"
      />
      <FormItem
        v-model="form.contact"
        label="联系方式"
        name="contact"
        type="input"
        validate="required|maxLength:30"
        placeholder="QQ / Wechat / Email"
        @changeValidate="valid => status.validate.contact = valid"
      >
        <span v-if="contactType" slot="tip">使用 {{ contactType }} 作为联系方式</span>
      </FormItem>
      <FormItem
        v-model="form.website"
        label="个人网站"
        name="website"
        type="input"
        validate="url|maxLength:60"
        placeholder="可填写你的网站、博客、微博或其他社媒地址"
        @changeValidate="valid => status.validate.website = valid"
      />
      <FormItem
        v-model="form.comment"
        label="内容"
        name="comment"
        type="input"
        validate="required|maxLength:30|minLength:4"
        placeholder="留下你的想法、疑问、评论或回忆"
        @changeValidate="valid => status.validate.comment = valid"
      />
      <FormItem
        v-if="['qq','email'].includes(contactType)"
        label="显示头像"
        name="avatar"
        type="custom"
      >
        <Avatar :value="form.contact" size="60px" />
      </FormItem>
      <Btn slot="footer" :full-width="true" :colorful="true" height="48px" @click="submitSendComment()">
        发送
      </Btn>
    </Modal>
    <Blocker height="40px"></Blocker>
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
    }
  },
  data () {
    return {
      status: {
        showModal: false,
        isLoadingSubmit: false,
        isLoadingList: false,
        validate: {
          username: false,
          contact: false,
          website: true,
          comment: false
        }
      },
      form: {},
      data: {
        commentList: []
      },
      meta: {}
    }
  },
  computed: {
    contactType () {
      const { contact = '' } = this.form
      const contactTypeList = {
        email: contact.includes('@'),
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
  mounted () {
    this.requestCommentList()
  },
  methods: {
    async requestCommentList (page = 1) {
      this.status.isLoadingList = true
      const { data: commentList, meta } = await this.$axios.$get('/api/comments/', {
        params: {
          pageSize: 10,
          module: this.module,
          id: this.id,
          page
        }
      })
      this.data.commentList = commentList
      this.meta = meta
      this.status.isLoadingList = false
    },
    redirectByUrl (url) {
      if (url) {
        window.open(url)
      }
    },
    submitSendComment () {
      if (this.$checkFormValidate(this.status.validate)) {
        this.status.isLoadingSubmit = true
        const { contact } = this.form
        const appendParams = {
          page_url: this.$route.path,
          page_title: document.title,
          module: this.module,
          id: this.id,
          is_display: 1,
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
          })
          .catch((error) => {
            this.status.isLoadingSubmit = false
          })
      } else {
        this.$message.error('表单填写有误')
      }
    }
  }
}
</script>
