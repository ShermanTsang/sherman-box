<style lang="scss">
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: $sidebar-width;
    background-color: #ffffff;
    overflow: hidden;
    transition: all .2s ease-in-out;
    box-shadow: 0 0 12px rgba(0,0,0,.06);

    &:hover {
      box-shadow: 0 0 24px rgba(0,0,0,.1);
    }

    &__container {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-content: center;
      justify-items: center;
      justify-content: center;
    }

  }
</style>

<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <ModuleMenu type="vertical" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutSidebar',
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
  }
}
</script>
