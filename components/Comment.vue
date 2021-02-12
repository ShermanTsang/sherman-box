<style lang="scss">
$prefix: 'comment';

.#{$prefix} {

  &__list {

  }

}
</style>

<template>
  <div class="comment">
    <Loading v-if="state.isLoadingList" :fix="true">
      评论加载中
    </Loading>
    <Nameplate title="评论" sub-title="comment">
      <Btn @click="state.showModal = true">
        写评论
      </Btn>
    </Nameplate>
    <div class="comment__list">
      <Waterfall v-if="data.commentList && data.commentList.length > 0" :column="2" gap="16px">
        <ItemComment
          v-for="item in data.commentList"
          :key="item.id"
          :item="item"
          level="parent"
          @clickReplyBtn="handleReply"
        ></ItemComment>
      </Waterfall>
    </div>
    <Tip v-if="!state.isLoadingList && data.commentList.length === 0" asset="pic-comment" max-width="240px">
      暂无评论
    </Tip>
    <Pagination
      v-if="meta && meta.last_page > 1"
      type="comment"
      :page="parseInt(meta.current_page)"
      :total="parseInt(meta.total)"
      :size="parseInt(meta.per_page)"
      @change="changePage"
    />
    <Modal v-model="state.showModal" :title="data.replyTarget ? '回复评论':'写评论'" icon="comment" width="800px">
      <Loading v-if="state.isLoadingSubmit" :fix="true">
        评论发送中
      </Loading>
      <FormItem
        v-if="data.replyTarget"
        label="回复对象"
        name="replyTarget"
        type="custom"
      >
        <ItemComment :item="data.replyTarget" :show-replies="false" />
      </FormItem>
      <FormItem
        v-model="form.username"
        validate="required|maxLength:8"
        label="昵称"
        name="username"
        type="input"
        placeholder="该如何称呼你呢？"
        @changeValidate="valid => state.validate.username = valid"
      />
      <FormItem
        v-model="form.contact"
        label="联系方式"
        name="contact"
        type="input"
        validate="required|maxLength:30"
        placeholder="QQ / Wechat / Email"
        @changeValidate="valid => state.validate.contact = valid"
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
        @changeValidate="valid => state.validate.website = valid"
      />
      <FormItem
        v-model="form.comment"
        label="内容"
        name="comment"
        type="input"
        validate="required|maxLength:500|minLength:4"
        placeholder="留下你的想法、疑问、评论或回忆"
        @changeValidate="valid => state.validate.comment = valid"
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
      state: {
        currentPage: 1,
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
        commentList: [],
        replyTarget: null
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
  watch: {
    'state.showModal' (state) {
      if (state === false) {
        this.data.replyTarget = null
      }
    }
  },
  mounted () {
    this.checkCurrentPageNum()
    this.requestCommentList()
    this.fillUserInfo()
  },
  methods: {
    checkCurrentPageNum () {
      const { query = {} } = this.$route
      if (query.commentPage) {
        this.state.currentPage = query.commentPage
      }
    },
    fillUserInfo () {
      this.$fillStateByLocalStorage('SET_USER', 'user', 'object', {})
      this.form = JSON.parse(JSON.stringify(this.$store.getters.user))
    },
    changePage (currentPage) {
      this.state.currentPage = currentPage
      this.requestCommentList(currentPage)
    },
    async requestCommentList (currentPage = this.state.currentPage) {
      this.state.isLoadingList = true
      const { data: commentList, meta } = await this.$axios.$get('/api/comments/', {
        params: {
          pageSize: 10,
          module: this.module,
          id: this.id,
          page: currentPage
        }
      })
      this.data.commentList = commentList
      this.meta = meta
      this.state.isLoadingList = false
    },
    redirectByUrl (url) {
      if (url) {
        window.open(url)
      }
    },
    submitSendComment () {
      if (this.$checkFormValidate(this.state.validate)) {
        this.state.isLoadingSubmit = true
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
        if (this.data.replyTarget) {
          appendParams.parent_id = this.data.replyTarget.id
        }
        const newComment = { ...this.form, ...appendParams }

        this.$axios.$post('/api/comments', newComment)
          .then((response) => {
            this.requestCommentList()
            this.state.showModal = false
            this.state.isLoadingSubmit = false
            this.fillUserInfo()
          })
          .catch((error) => {
            this.state.isLoadingSubmit = false
          })

        this.$store.commit('SET_USER', {
          username: this.form.username,
          contact: this.form.contact,
          website: this.form.website
        })
      } else {
        this.$message.error('表单填写有误')
      }
    },
    handleReply (replyItem) {
      this.data.replyTarget = replyItem
      this.state.showModal = true
    }
  }
}
</script>
