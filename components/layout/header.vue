<style lang="scss">
</style>

<template>
  <header class="fixed bg-[rgba(255,255,255,.8)] z-99 top-0 left-0 right-0 backdrop-filter backdrop-blur-md backdrop-saturate-[2] w-full border-b-1 border-gray-100 transition duration-200 hover:(bg-[rgba(255,255,255,.95)]) <md:(px-4)">
    <div class="container w-full mx-auto flex flex-row flex-nowrap justify-between items-center" :class="{'hidden': state.isPinNavigator}">
      <div id="logo" class="header__main__logo">
        <Logo type="text" height="40px" />
      </div>
      <div class="flex flex-row justify-between items-center">
        <ModuleMenu />
        <Search />
      </div>
    </div>
    <div id="navigator" class="container w-full mx-auto">
      <Navigator />
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data () {
    return {
      state: {
        isPinNavigator: false,
        lastScrollOffset: 0
      }
    }
  },
  computed: {
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const isScrollDown = (scrollOffset - this.state.lastScrollOffset) > 0
      this.state.isPinNavigator = isScrollDown && scrollOffset > 200
      this.state.lastScrollOffset = scrollOffset
    }
  }
}
</script>
