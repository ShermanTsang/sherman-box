<style lang="scss">
  .common-item {
    position: relative;
    margin: 10px 0;
    overflow: hidden;
    transition-duration: 0.2s;
    line-height: 1.5;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    font-size: 1rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    &__main {
      padding: 32px;
      overflow: hidden;
      align-self: center;
      flex: 1;
      width: 0;

      &__name {
        display: block;
        overflow: hidden;
        font-size: 1.05rem;
        padding-bottom: 6px;
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

        &__detail {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      @media ($screen-xs-max) {
        padding: 16px;
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

    &__image {
      flex: 0 0 200px;
      opacity: .5;
      transition: all .2s ease-in-out;
      cursor: pointer;
      min-height: 200px;
      z-index: $z-index-card-background;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 0 0 6px rgba(0, 0, 0, .1);
      }

      @media ($screen-xs-max) {
        $smallImageSize: 120px;
        flex: 0 0 $smallImageSize;
        width: $smallImageSize;
      }
    }

    &:hover {
      .common-item {
        &__image {
          opacity: 1;
        }
      }
    }

  }

  .common-item--right {
    .common-item {
      &__main {
        order: 0;
      }

      &__image {
        order: -1;
      }

      &__module {
        left: 0;
        right: unset;
      }
    }
  }
</style>

<template>
  <Card class="common-item" :class="{'common-item--right':align === 'right'}">
    <div class="common-item__module">
      {{ module.name }}
    </div>
    <div class="common-item__main">
      <div class="common-item__main__name" @click="redirectToItem()" v-html="nameHtml">
      </div>
      <div v-if="text === 'date'" class="common-item__main__info">
        <Datetime format="YYYY.MM.DD" :time="item[module.dateField]" />
      </div>
      <div v-else-if="text === 'detail'" class="common-item__main__info">
        <div v-for="(textItem,index) in textHtml" :key="index" class="common-item__main__info__detail" v-html="textItem">
        </div>
      </div>
    </div>
    <div v-if="item.image" class="common-item__image" @click="redirectToItem()">
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
    nameHtml () {
      let nameHtml = this.item.name || ''
      const keyword = this.$route.query.keyword
      if (keyword) {
        const replaceReg = new RegExp(keyword, 'g')
        const replaceString = '<span class="search-text">' + keyword + '</span>'
        nameHtml = nameHtml.replace(replaceReg, replaceString)
      }
      return nameHtml
    },
    textHtml () {
      let textHtml = this.item.text || ''
      const keyword = this.$route.query.keyword
      if (keyword) {
        const replaceReg = new RegExp(keyword, 'g')
        const replaceString = '<span class="search-text">' + keyword + '</span>'
        textHtml = textHtml.replace(replaceReg, replaceString)
      }
      return textHtml.split('|')
    }
  },
  methods: {
    redirectToItem () {
      const link = this.link
      this.$route.path === '/search' ? window.open(link, '_blank') : this.$router.push(link)
    }
  }
}
</script>
