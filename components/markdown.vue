<style lang="scss">
  .markdown {
    article {
      font-size: 1rem;
      line-height: 2em;
      counter-reset: h1;
      color: #666;
      letter-spacing: 2px;

      h1, h2, h3, h4, h5 {
        font-weight: normal;
        cursor: pointer;

        &:hover {
          &:before {
            color: #666;
          }
        }
      }

      h1 {
        &:before {
          counter-increment: h1;
          content: counter(h1) " ";
          color: #999;
          font-size: .85em;
          padding-right: 5px;
        }

        counter-reset: h2;
        margin: 40px 0;
      }

      h2 {
        &:before {
          counter-increment: h2;
          content: counter(h1) "." counter(h2) " ";
          color: #999;
          font-size: .85em;
          padding-right: 5px;
        }

        counter-reset: h3;
        margin: 20px 0;
      }

      h3 {
        &:before {
          counter-increment: h3;
          content: counter(h1) "." counter(h2) "." counter(h3) " ";
          color: #999;
          font-size: .85em;
          padding-right: 5px;
        }

        margin: 10px 0;
      }

      blockquote {
      }

      p {
        display: block;
        -webkit-margin-before: 0.5em;
        -webkit-margin-after: 0.5em;
        -webkit-margin-start: 0;
        -webkit-margin-end: 0;
      }

      code {
        max-height: 250px;
      }

      img {
        display: block;
        cursor: pointer;
        margin: 20px auto;
        max-width: 100%;
        transition: all .2s ease-in;

        &:hover {
          box-shadow: 0 0 6px rgba(177, 177, 177, .5);
        }
      }
    }
  }
</style>

<template>
  <div class="markdown">
    <article
      v-lazy-container="{ selector: 'img' }"
      class="markdown"
      @click="handleClick($event)"
      v-html="compiledMarkdown"
    >
      <slot></slot>
    </article>
    <image-modal v-if="imageModalUrl" :url.sync="imageModalUrl" />
  </div>
</template>

<script>
import Marked from 'marked'

export default {
  name: 'Markdown',
  props: {
    content: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      renderer: new Marked.Renderer(),
      imageModalUrl: ''
    }
  },
  computed: {
    compiledMarkdown() {
      this.setOption()
      this.setRenderer()
      return Marked(this.content)
    }
  },
  mounted() {
  },
  methods: {
    handleClick(event) {
      if (event.target.nodeName === 'IMG') {
        this.showOriginImage(event.target.src)
      }
    },
    showOriginImage(url) {
      this.imageModalUrl = url
    },
    setRenderer() {
      this.renderer.image = (href, title, text) => {
        return `<img data-src="${this.$getOssUrl(href)}">`
      }
      this.renderer.link = (href, title, text) => {
        const titleOutput = title ? `title="${title}"` : ''
        return `<a href="${href}"  ${titleOutput} target="_blank">${text}</a>`
      }
    },
    setOption() {
      Marked.setOptions({
        renderer: this.renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      })
    }
  }
}
</script>
