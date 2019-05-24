<style lang="scss">
  .markdown {
    font-size: 1rem;
    line-height: 30px;
    img {
      cursor: pointer;
      margin: 10px 0;
      max-width: 100%;
      transition: all .2s ease-in;
      &:hover{
        width: 100%;
        transform: scale(.99);
        box-shadow: 0 0 6px rgba(177,177,177,.5);
      }
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
