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
            background-color: #51defe;
            background-image: linear-gradient(126deg, #51defe 0%, #1170f5 79%);
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
    <ClientOnly placeholder="Loading...">
      <article
        v-lazy-container="{ selector: 'img' }"
        class="markdown"
        @click="handleClick($event)"
        v-html="compiledMarkdown"
      ></article>
    </ClientOnly>
    <ImageGallery v-model:url="imageModalUrl" />
  </div>
</template>

<script setup>
import { Marked } from 'marked'

import Highlight from 'highlight.js'

import 'highlight.js/styles/monokai-sublime.css'

import { computed, ref } from 'vue'
import { useSiteHelpers } from '~/composables/useSiteHelpers'

defineOptions({ name: "Markdown" })

const props = defineProps({
  content: {
    type: String,
    default: null
  }
})

const imageModalUrl = ref(null)
const { getOssUrl } = useSiteHelpers()

const markdown = new Marked({
  gfm: true,
  breaks: false,
  pedantic: false,
  renderer: {
    image ({ href }) {
      return `<img data-src="${getOssUrl(href)}">`
    },
    link ({ href, title, tokens }) {
      const titleOutput = title ? `title="${title}"` : ''
      const text = this.parser.parseInline(tokens)
      return `<a href="${href}" ${titleOutput} target="_blank" rel="noopener">${text}</a>`
    },
    table (token) {
      const header = token.header.map(cell => this.tablecell(cell)).join('')
      const rows = token.rows.map((row) => {
        const cells = row.map(cell => this.tablecell(cell)).join('')
        return this.tablerow({ text: cells })
      }).join('')
      const body = rows ? `<tbody>${rows}</tbody>` : ''
      return `<div class="table-wrap">\n<table>\n<thead>\n${this.tablerow({ text: header })}</thead>\n${body}</table>\n</div>\n`
    },
    code ({ text }) {
      return `<pre><code>${Highlight.highlightAuto(text).value}</code></pre>\n`
    }
  }
})

const compiledMarkdown = computed(() => {
  return import.meta.client
    ? markdown.parse(props.content || '', { async: false })
    : props.content
})

function handleClick (event) {
  const target = event.target
  if (target?.nodeName === 'IMG') {
    imageModalUrl.value = target.src
  }
}

</script>
