<style lang="scss">
$prefix: 'markdown';

.#{$prefix} {

    article {
      font-size: 1rem;
      counter-reset: h1;
      color: #666;
      letter-spacing: 1px;
      width: 100%;

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
        font-size: 1.4em;
        counter-reset: h2;
        margin: 40px 0;

        &:before {
          counter-increment: h1;
          content: counter(h1) " ";
          color: #999;
          font-size: .85em;
          padding-right: 5px;
        }


      }

      h2 {
        font-size: 1.3em;
        counter-reset: h3;
        margin: 20px 0;

        &:before {
          counter-increment: h2;
          content: counter(h1) "." counter(h2) " ";
          color: #999;
          font-size: .85em;
          padding-right: 5px;
        }

      }

      h3 {
        font-size: 1.2em;
        margin: 10px 0;

        &:before {
          counter-increment: h3;
          content: counter(h1) "." counter(h2) "." counter(h3) " ";
          color: #999;
          font-size: .85em;
          padding-right: 5px;
        }
      }

      ul {
        line-height: 2;
        padding-left: 20px;

        li {
          position: relative;
          padding-left: 16px;
          list-style-type: none;

          &:before {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background-color: #aaa;
            left: 0;
            top: calc(50% - 2px);
          }
        }
      }

      ol {
        line-height: 2;
        margin-left: 20px;

        li {
          position: relative;
        }
      }

      p {
        -webkit-margin-before: 0.5em;
        -webkit-margin-after: 0.5em;
        -webkit-margin-start: 0;
        -webkit-margin-end: 0;
        line-height: 1.8;

        a {
          color: $theme-color;
        }

        code {
          margin: 0 4px;
          color: $theme-color;
          position: relative;
          font-family: Source Code Pro, DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas, Inconsolata, Courier, monospace, PingFang SC, Microsoft YaHei, sans-serif !important;
          font-size: .9em;

          &:after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            opacity: .4;
            @include gradient-background;
          }
        }
      }

      pre {
        background: #272822;
        padding: 16px;
        max-height: 400px;
        width: 100%;
        overflow: auto;

        code {
          color: #f8f8f2;
          font: 400 .95em Source Code Pro, DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas, Inconsolata, Courier, monospace, PingFang SC, Microsoft YaHei, sans-serif !important;
        }
      }

      img {
        display: block;
        cursor: pointer;
        margin: 20px 0;
        max-width: 100%;
        transition: all .2s ease-in;

        &:hover {
          box-shadow: 0 0 6px rgba(177, 177, 177, .5);
        }
      }

      .table-wrap {
        width: 100%;
        overflow: hidden;
        overflow-x: scroll;

        table {
          border-collapse: collapse;

          thead {
            background-color: #efefef;
            text-align: left;

            tr {
              border-bottom: 2px solid #efefef;

              th {
                border: none;
                padding: 10px 6px;
                font-weight: normal;
                white-space: nowrap;

                &:not(:first-child) {
                  border-left: 1px solid #efefef;
                  margin-left: 6px;
                }
              }
            }
          }

          tbody {

            tr {
              border-bottom: 2px solid #efefef;
              transition: all .2s ease-in-out;

              td {
                padding: 10px 6px;
                font-weight: normal;
                white-space: nowrap;

                &:not(:first-child) {
                  border-left: 1px solid #efefef;
                  margin-left: 6px;
                }
              }

              &:hover {
                background-color: rgba(239, 239, 239, 0.5);
              }
            }
          }
        }
      }

      & {
        @media ($screen-xs-max) {
          font-size: 15px;
          padding: 0 6px;

          pre {
            max-height: 35vh;
          }
        }
      }

    }

  }
</style>

<template>
  <div class="markdown">
    <client-only placeholder="Loading...">
      <article
        v-lazy-container="{ selector: 'img' }"
        class="markdown"
        @click="handleClick($event)"
        v-html="compiledMarkdown"
      >
        <slot />
      </article>
    </client-only>
    <ImageGallery :url.sync="imageModalUrl" />
  </div>
</template>

<script>
import Marked from 'marked'
import Highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default {
  name: 'Markdown',
  props: {
    content: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      renderer: new Marked.Renderer(),
      imageModalUrl: null
    }
  },
  computed: {
    compiledMarkdown () {
      return process.client ? Marked(this.content) : this.content
    }
  },
  created () {
    if (process.client) {
      this.setMarkdownOption()
      this.setMarkdownRenderer()
    }
  },
  methods: {
    handleClick (event) {
      if (event.target.nodeName === 'IMG') {
        this.imageModalUrl = event.target.src
      }
    },
    setMarkdownRenderer () {
      this.renderer.image = (href, title, text) => {
        return `<img data-src="${this.$getOssUrl(href)}">`
      }
      this.renderer.link = (href, title, text) => {
        const titleOutput = title ? `title="${title}"` : ''
        return `<a href="${href}"  ${titleOutput} target="_blank" rel="noopener">${text}</a>`
      }
      this.renderer.table = (header, body) => {
        if (body) { body = '<tbody>' + body + '</tbody>' }
        return '<div class="table-wrap">\n' + '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n' + '</div>\n'
      }
    },
    setMarkdownOption () {
      Marked.setOptions({
        renderer: this.renderer,
        highlight: (code) => {
          return Highlight.highlightAuto(code).value
        },
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        smartLists: true,
        smartypants: false
      })
    }
  }
}
</script>
