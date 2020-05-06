<style lang="scss">
  .toolbar {
    background-color: rgba(255, 255, 255, .95);
    overflow: hidden;
    height: $header-height;
    padding: 10px 20px;

    &__container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      overflow: hidden;

      @media ($screen-xs-max) {
        flex-flow: column nowrap;
        padding: 10px;
      }

      &__main {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;

        @media ($screen-xs-max) {
          padding: 16px 0;
        }

      }

    }

  }

  .toolbar--pinned {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $z-index-toolbar;
    margin-left: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,.1);
  }
</style>

<template>
  <div v-if="currentModule" id="toolbar" class="toolbar">
    <div class="toolbar__container">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {}
  },
  computed: {
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      const toolbar = document.querySelector('#toolbar')
      if (toolbar) {
        const toolbarClassList = toolbar.classList
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 160) {
          toolbarClassList.add('')
        } else {
          toolbarClassList.remove('')
        }
      }
    }
  }
}
</script>
