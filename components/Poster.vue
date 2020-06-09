<style lang="scss">
  .poster {

    &__form {
    }

    &__body {
      width: 100%;
      box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #efefef;

      &__image {
        width: 100%;
        max-height: 340px;
        overflow: hidden;
      }

      &__text {
        padding: 16px;
        line-height: 1.8;
        font-size: 1rem;
        color: #999;

        span {
          position: relative;
          color: $theme-color;
          padding: 0 4px;
        }
      }

      &__footer {
        border-top: 2px dashed #eee;
        padding: 16px;
        font-size: .9rem;
        color: #999;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        &__qrcode {

        }

        &__text {
          padding: 16px;
          line-height: 1.5;
          flex-grow: 1;
        }
      }
    }

    &__image {
      width: 100%;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

  }
</style>

<template>
  <div class="poster">
    <template v-if="!this.$getModuleConfig(module).poster_text">
      <Tip>
        该模块暂不支持海报分享
      </Tip>
    </template>
    <template v-else>
      <div v-if="status.isEditingMode && status.isPreDataReady" class="poster__form">
        <FormItem
          v-for="item in variableFieldArray"
          :key="item.field"
          v-model="form[item.field]"
          validate="required"
          :label="item.text"
          :name="item.text"
          type="input"
          :placeholder="`请输入 ${item.text}`"
          @changeValidate="valid => status.validate[item.field] = valid"
        />
        <Blocker height="24px" />
        <Btn :full-width="true" :colorful="true" height="48px" @click="submitPosterForm()">
          生成专属海报
        </Btn>
      </div>
      <div v-show="!status.isEditingMode && !data.posterImage" ref="posterBody" class="poster__body">
        <div class="poster__body__image">
          <Pic :url="image" auto-fill :lazy-load="false" />
        </div>
        <div class="poster__body__text" v-html="posterTextHtml" />
        <div class="poster__body__footer">
          <div class="poster__body__footer__qrcode">
            <QrCode v-if="data.pageUrl" :size="80" color-dark="#999">
              {{ data.pageUrl }}
            </QrCode>
          </div>
          <div class="poster__body__footer__text">
            长按图片可 扫码 / 保存海报
            <br>
            {{ data.pageUrl }}
            <br>
            ShareMan's Box
          </div>
        </div>
      </div>
      <div v-if="data.posterImage" class="poster__image">
        <img :src="data.posterImage">
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Poster',
  props: {
    module: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    textTemplate: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    fields: {
      type: Array,
      default () {
        // Format example
        // :fields="[{field: 'fieldName',value: fieldValue}]"
        return []
      }
    }
  },
  data () {
    return {
      form: {},
      status: {
        isEditingMode: true,
        isPreDataReady: false,
        validate: {}
      },
      data: {
        posterImage: null,
        pageUrl: null
      }
    }
  },
  computed: {
    variableFieldArray () {
      const variableFieldArray = []
      if (!this.textTemplate) {
        return variableFieldArray
      }
      const matchPatterns = this.textTemplate.match(/{(.+?)}/g)
      matchPatterns.forEach((pattern) => {
        const variableFieldObject = pattern.replace(/{(.*?)}/g, '$1').split(':')
        variableFieldArray.push({ field: variableFieldObject[0], text: variableFieldObject[1] })
      })
      return variableFieldArray
    },
    posterTextHtml () {
      let posterText = this.textTemplate
      this.variableFieldArray.forEach((item) => {
        posterText = posterText.replace(new RegExp('{' + item.field + '.*?}'), `<span>${this.form[item.field]}</span>`)
      })
      return posterText
    }
  },
  mounted () {
    this.prepareFields()
    this.setCompleteUrl()
  },
  methods: {
    setCompleteUrl () {
      this.data.pageUrl = window.location.href
    },
    prepareFields () {
      if (this.fields && this.fields.length > 0) {
        this.fields.forEach((item) => {
          const matchField = this.variableFieldArray.find(fieldItem => fieldItem.field === item.field)
          matchField && this.$set(this.form, item.field, item.value)
        })
      }
      this.variableFieldArray.forEach((item) => {
        this.status.validate[item.field] = false
      })
      this.status.isPreDataReady = true
    },
    submitPosterForm () {
      if (this.$checkFormValidate(this.status.validate)) {
        this.status.isEditingMode = false
        this.generatePoster()
      } else {
        this.$message.error('表单填写有误')
      }
    },
    generatePoster () {
      setTimeout(() => {
        const posterBody = this.$refs.posterBody
        this.$html2canvas(posterBody, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          letterRendering: true,
          backgroundColor: '#fff'
        }).then((canvas) => {
          this.data.posterImage = canvas.toDataURL('image/png')
        })
      })
    }
  }
}
</script>
