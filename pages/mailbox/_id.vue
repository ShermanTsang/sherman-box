<style lang="scss">
  .mailbox {

    &__image {
      width: 100%;
      height: 400px;
      background-size: cover;
      background-position: center center;
    }

    &__main {
      margin-top: 40px;
      overflow: hidden;
      text-align: center;

      &__text {
        color: #666;
        cursor: default;
        padding: 0 20px;

        &__title {
          letter-spacing: 2px;
          font-size: 1.6rem;
        }

        &__info {
          margin-top: 20px;
          color: #999;
          span {
            font-style: italic;
            font-size: 1.2rem;
            margin: 0 10px;
          }
        }
      }
    }

    &__locker {
      display: block;
      margin: 40px auto;
      border: 1px solid #ddd;
    }

  }
</style>

<template>
  <div class="mailbox">
    <div v-lazy:background-image="$getOssUrl(data.mailboxItem.image)" class="mailbox__image"></div>
    <LayoutContainer class="mailbox__main">
      <LayoutContainer class="mailbox__main__text">
        <div class="mailbox__main__text__title">
          {{ data.mailboxItem.name }}
        </div>
        <div class="mailbox__main__text__info">
          <span>From</span> {{ data.mailboxItem.from }}
          <span>To</span> {{ data.mailboxItem.to }}
        </div>
        <div class="mailbox__main__text__info">
          <Icon name="clock" />
          <Datetime format="YYYY-MM-DD" :time="data.mailboxItem.datetime" from-now />
        </div>
      </LayoutContainer>
    </LayoutContainer>
    <Btn v-if="data.mailboxItem.content === null" width="300px" class="mailbox__locker" @click="status.showModal = true">
      <Icon name="lock" /> 解锁
    </Btn>
    <LayoutContainer v-if="data.mailboxItem.content !== null" class="mailbox__content">
      <Markdown :content="data.mailboxItem.content" />
    </LayoutContainer>
    <Blocker height="60px" />
    <LayoutContainer>
      <Comment :id="data.mailboxItem.id" module="mailbox" :source-data="data.mailboxItem.comments" />
    </LayoutContainer>
    <Blocker height="60px" />
    <Modal v-model="status.showModal" title="解锁邮盒" icon="comment" width="500px">
      <Loading v-if="status.isLoadingSubmit" :fix="true">
        密码校验中
      </Loading>
      <FormItem
        v-model="form.password"
        validate="required"
        label="密码"
        name="password"
        type="input"
        placeholder="等待解锁"
        @changeValidate="valid => status.validate.password = valid"
      >
        <span v-if="data.mailboxItem.hint" slot="tip">提示：{{ data.mailboxItem.hint }}</span>
      </FormItem>
      <Btn slot="footer" :full-width="true" height="48px" :colorful="true" @click="submitCheckPassword()">
        校验
      </Btn>
    </Modal>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    const { name, category, description } = this.data.mailboxItem
    return {
      title: `${name} - ${category.name} - 邮盒`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${description || ''}`)
        }
      ]
    }
  },
  data() {
    return {
      status: {
        showModal: false,
        isLoadingSubmit: false,
        validate: {
          password: false
        }
      },
      form: {
        password: ''
      }
    }
  },
  async asyncData({ $axios, store, params }) {
    const { data: mailboxItem } = await $axios.$get(`/api/mailboxes/${params.id}`)
    store.commit('currentItem', mailboxItem)
    return {
      data: {
        mailboxItem
      }
    }
  },
  mounted() {
    if (this.data.mailboxItem.content === null) {
      this.$message.info('该邮盒需要密码解锁')
    }
  },
  methods: {
    submitCheckPassword() {
      if (!this.$checkFormValidate(this.status.validate)) {
        this.$message.error('表单有错误')
        return
      }
      this.status.isLoadingSubmit = true
      const { id } = this.data.mailboxItem
      const { password } = this.form
      this.$axios.$post(`/api/mailboxes/${id}/check`, { password })
        .then(({ data, event, code }) => {
          if (event === 'returnErrorMessage' || event === 6000) {
            this.$message.error('邮盒密码错误')
            this.status.showModal = false
            this.status.isLoadingSubmit = false
            this.errors.clear()
            return
          }
          if (code === 200) {
            this.data.mailboxItem = data
          }
          this.status.showModal = false
          this.status.isLoadingSubmit = false
          this.errors.clear()
        })
    }
  }
}
</script>
