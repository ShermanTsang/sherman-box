<style lang="scss">
.timeline-item {
  position: relative;
  margin: 10px 0;
  overflow: hidden;
  transition-duration: 0.2s;
  text-overflow: ellipsis;
  letter-spacing: 1px;
  font-size: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border: 1px solid #efefef;

  &__main {
    padding: 32px;
    overflow: hidden;
    align-self: center;
    flex: 1;

    &__name {
      display: block;
      overflow: hidden;
      font-size: 1.05rem;
      padding-bottom: 16px;
      border-bottom: 1px solid #efefef;
      letter-spacing: 1px;
      cursor: pointer;
      color: #666;

      small {
        color: #999;
      }
    }

    &__info {
      color: #999999;
      font-size: .9rem;
      margin-top: 6px;
      overflow: hidden;
      line-height: 2;

      &__detail {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    @media ($screen-md-max) {
      width: 100%;
      order: 2;
      padding: 16px;
    }
  }

  &__image {
    flex: 0 0 200px;
    opacity: .5;
    transition: all .2s ease-in-out;
    cursor: pointer;
    z-index: $z-index-card-background;
    overflow: hidden;
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media ($screen-md-max) {
      order: 1;
      height: 240px;
      flex: 0 0 240px;
    }

  }

  &__module {
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(rgba(0, 0, 0, .4), transparent);
    color: #fff;
    padding: 6px 6px 14px 6px;
    letter-spacing: 1px;
    font-size: .9rem;
    z-index: $z-index-card-content;
  }

  &:hover {
    .timeline-item {
      &__image {
        opacity: 1;
      }
    }
  }

  @media screen and ($screen-md-max) {
    flex-flow: column nowrap;
  }

}

.timeline-item--right {
  .timeline-item {
    &__main {
      order: 0;
      @media screen and ($screen-md-max) {
        order: 2;
      }
    }

    &__image {
      order: -1;
      @media screen and ($screen-md-max) {
        order: 1;
      }
    }

    &__module {
      left: 0;
      right: unset;
    }
  }
}

.search-text {
  color: orange;
  margin: 0 1px;
}

.separator-text {
  color: #eaeaea;
  font-weight: bold;
  margin: 0 6px;
}
</style>

<template>
  <Card class="timeline-item" :class="{'timeline-item--right':align === 'right'}">
    <div class="timeline-item__module">
      {{ module.name }}
    </div>
    <div class="timeline-item__main">
      <div class="timeline-item__main__name" @click="redirectToItem()" v-html="nameFieldHtml">
      </div>
      <div v-if="text === 'date'" class="timeline-item__main__info">
        <Datetime format="YYYY.MM.DD" :time="item[module.dateField]" />
      </div>
      <div v-else-if="text === 'detail'" class="timeline-item__main__info">
        <div
          v-for="(textItem,index) in textFieldHtml"
          :key="index"
          class="timeline-item__main__info__detail"
          v-html="textItem"
        >
        </div>
      </div>
    </div>
    <div v-if="item.image" class="timeline-item__image" @click="redirectToItem()">
      <img v-lazy="$getOssUrl(item.image)">
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ItemDay',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    align: {
      type: String,
      validator (value) {
        return ['left', 'right'].includes(value)
      },
      default: 'left'
    },
    text: {
      type: String,
      validator (value) {
        return ['date', 'detail'].includes(value)
      },
      default: 'date'
    },
    openInNewWindow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      config: this.$getModuleConfig()
    }
  },
  computed: {
    module () {
      return this.config[this.item.module]
    },
    link () {
      return `/${this.item.module}/` + (this.item.module === 'day' ? `${this.$time(this.item.datetime).format('YYYY-MM-DD')}` : `${this.item.id}`)
    },
    nameFieldHtml () {
      let nameFieldHtml = this.item.name || ''
      const keyword = this.$route.query.keyword
      if (keyword) {
        const replaceReg = new RegExp(keyword, 'g')
        const replaceString = '<span class="search-text">' + keyword + '</span>'
        nameFieldHtml = nameFieldHtml.replace(replaceReg, replaceString)
      }
      return nameFieldHtml
    },
    textFieldHtml () {
      const textFieldHtmlArray = []
      const keyword = this.$route.query.keyword
      const [keywordReplaceReg, keywordReplaceString] = [new RegExp(keyword, 'g'), '<span class="search-text">' + keyword + '</span>']
      const [separatorReplaceReg, separatorReplaceString] = [/,/g, '<span class="separator-text">/</span>']
      this.item.text.split('|').forEach((value) => {
        const tags = this.$getFilteredTagArray(value)
        let text = tags.join(',')

        if (keyword) {
          text = text.replace(keywordReplaceReg, keywordReplaceString)
        }
        const separator = ','
        if (separator) {
          textFieldHtmlArray.push(text.replace(separatorReplaceReg, separatorReplaceString))
        }
      })
      return textFieldHtmlArray
    },
  },
  methods: {
    redirectToItem () {
      const link = this.link
      if (this.$route.path === '/search' || this.openInNewWindow) {
        window.open(link, '_blank')
      } else {
        this.$router.push(link)
      }
    }
  }
}
</script>
