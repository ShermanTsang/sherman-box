<style lang="scss">
$prefix: 'html-content';

  .#{$prefix} {

    article {
      font-size: 1rem !important;
      counter-reset: h1 !important;
      color: #666 !important;
      letter-spacing: 1px !important;
      width: 100% !important;

      h1, h2, h3, h4, h5 {
        font-weight: normal !important;
        cursor: pointer !important;

        &:hover {
          &:before {
            color: #666 !important;
          }
        }
      }

      h1 {
        font-size: 1.4em !important;

        &:before {
          counter-increment: h1 !important;
          content: counter(h1) " " !important;
          color: #999 !important;
          font-size: .85em !important;
          padding-right: 5px !important;
        }

        counter-reset: h2 !important;
      }

      h2 {
        font-size: 1.3em !important;

        &:before {
          counter-increment: h2 !important;
          content: counter(h1) "." counter(h2) " " !important;
          color: #999 !important;
          font-size: .85em !important;
          padding-right: 5px !important;
        }

        counter-reset: h3 !important;
      }

      h3 {
        font-size: 1.2em !important;

        &:before {
          counter-increment: h3 !important;
          content: counter(h1) "." counter(h2) "." counter(h3) " " !important;
          color: #999 !important;
          font-size: .85em !important;
          padding-right: 5px !important;
        }

      }

      blockquote {
      }

      ul {
        line-height: 2 !important;
        padding-left: 20px !important;

        li {
          position: relative !important;
          padding-left: 16px !important;
          list-style-type: none !important;

          &:before {
            content: '' !important;
            position: absolute !important;
            width: 4px !important;
            height: 4px !important;
            background-color: #aaa !important;
            left: 0 !important;
            top: calc(50% - 2px) !important;
          }
        }
      }

      ol {
        line-height: 2 !important;
        margin-left: 20px !important;

        li {
          position: relative !important;
        }
      }

      p {
        -webkit-margin-before: 0.5em !important;
        -webkit-margin-after: 0.5em !important;
        -webkit-margin-start: 0 !important;
        -webkit-margin-end: 0 !important;
        line-height: 1.8 !important;

        a {
          color: $theme-color !important;
        }

        code {
          margin: 0 4px !important;
          position: relative !important;
          font-family: Source Code Pro, DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas, Inconsolata, Courier, monospace, PingFang SC, Microsoft YaHei, sans-serif !important;
          font-size: .9em !important;
        }
      }

      img {
        display: block !important;
        cursor: pointer !important;
        margin: 20px 0 !important;
        max-width: 100% !important;
        height: auto !important;
        transition: all .2s ease-in !important;

        &:hover {
          box-shadow: 0 0 6px rgba(177, 177, 177, .5) !important;
        }
      }

      .table-wrap {
        width: 100% !important;
        overflow: hidden !important;
        overflow-x: scroll !important;

        table {
          border-collapse: collapse !important;
        }
      }

      pre {
        width: 100% !important;
        overflow: auto !important;
      }

      @media ($screen-xs-max) {
        font-size: 15px !important;
        padding: 0 6px !important;

        pre {
          max-height: 35vh !important;
        }
      }

    }

  }
</style>

<template>
  <div class="html-content">
    <client-only placeholder="Loading...">
      <article
        class="html-content"
        @click="handleClick($event)"
        v-html="finalHtml"
      >
        <slot />
      </article>
    </client-only>
    <ImageGallery :url.sync="imageModalUrl" />
  </div>
</template>

<script>
export default {
  name: 'HtmlContent',
  props: {
    content: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      imageModalUrl: null
    }
  },
  computed: {
    finalHtml () {
      return this.content.replace(/<img(?:.|\s)*?/gi, '<img referrerpolicy="no-referrer"')
    }
  },
  methods: {
    handleClick (event) {
      if (event.target.nodeName === 'IMG') {
        this.imageModalUrl = event.target.src
      }
    }
  }
}
</script>
