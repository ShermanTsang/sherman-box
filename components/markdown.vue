<style lang="scss">
  .markdown {
    font-size: 1rem;
    line-height: 30px;
    img {
      margin: 10px 0;
      max-width: 100%;
    }
  }
</style>

<template>
  <article class="markdown" v-html="compiledMarkdown">
    <slot></slot>
  </article>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Markdown',
  props: {
    content: {
      type: String,
      default: null
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content)
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
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
</script>
