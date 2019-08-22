<style lang="scss">
  .mailbox {

    &__image {
      width: 100%;
      height: 400px;
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
      margin: 20px auto;
      border: 1px solid #eee;
    }

  }
</style>

<template>
  <div class="mailbox">
    <div v-lazy:background-image="$getOssUrl(data.mailboxItem.image)" class="mailbox__image"></div>
    <layout-container class="mailbox__main">
      <layout-container class="mailbox__main__text">
        <div class="mailbox__main__text__title">
          {{ data.mailboxItem.name }}
        </div>
        <blocker height="20px" />
        <div class="mailbox__main__text__info">
          <icon name="clock" />
          <moment format="YYYY-MM-DD" :time="data.mailboxItem.datetime" from-now />
        </div>
        <div class="mailbox__main__text__info">
          <span>From</span> {{ data.mailboxItem.from }}
          <span>To</span> {{ data.mailboxItem.to }}
        </div>
      </layout-container>
    </layout-container>
    <btn v-if="data.mailboxItem.content === null" width="400px" class="mailbox__locker" @click="status.showModal = true">
      <icon name="lock" /> 解锁
    </btn>
    <layout-container v-if="data.mailboxItem.content !== null" class="mailbox__content">
      <markdown :content="data.mailboxItem.content" />
    </layout-container>
    <blocker height="60px" />
    <layout-container>
      <comment :id="data.mailboxItem.id" module="mailbox" :source-data="data.mailboxItem.comments" />
    </layout-container>
    <blocker height="60px" />
    <modal v-model="status.showModal" title="解锁邮盒" icon="comment" width="500px">
      <loading v-if="status.isLoadingSubmit" :fix="true">
        密码校验中
      </loading>
      <form-item
        v-model="form.password"
        validate="required"
        label="密码"
        name="password"
        type="input"
        placeholder="等待解锁"
        @changeValidate="valid => status.validate.password = valid"
      >
        <span v-if="data.mailboxItem.hint" slot="tip">提示：{{ data.mailboxItem.hint }}</span>
      </form-item>
      <btn slot="footer" :full-width="true" height="48px" :colorful="true" @click="submitCheckPassword()">
        校验
      </btn>
    </modal>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title: `${this.data.mailboxItem.name} - ${this.data.mailboxItem.category.name} - 邮盒`,
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', `${this.data.mailboxItem.description || ''}`)
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
  async asyncData({ $axios, params }) {
    const { data: mailboxItem } = await $axios.$get(`/api/mailboxes/${params.id}`)
    return {
      data: {
        mailboxItem
      }
    }
  },
  methods: {
    checkValidate() {
      const validateList = Object.values(this.status.validate) || {}
      const falseItem = validateList.find(item => item === false)
      return !!(falseItem || falseItem === undefined)
    },
    submitCheckPassword() {
      if (this.checkValidate()) {
        this.status.isLoadingSubmit = true
        const { id } = this.data.mailboxItem
        const { password } = this.form
        this.$axios.$post(`/api/mailboxes/${id}/check`, { password })
          .then((response) => {
            console.log(response)
            this.status.showModal = false
            this.status.isLoadingSubmit = false
            this.errors.clear()
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('表单有错误')
      }
    }
  }
}
</script>
