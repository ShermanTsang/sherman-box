<style lang="scss">
  .tabs {
    position: relative;
    margin: 16px 0;

    &__select {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-bottom: 1px solid #efefef;
      box-shadow: 0 6px 10px rgba(177,177,177,.1);

      &__item {
        color: #666;
        position: relative;
        letter-spacing: 1px;
        font-size: 1rem;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px 4px 0 0;

        &:not(:last-child) {
          margin-right: 24px;
        }

        &:hover {
          background-color: rgba(177,177,177,.1);
        }
      }

      &__item--active {
        color: $theme-color;
        background-color: rgba($theme-color,.1);
      }

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }

    }

    &__content {

    }

  }
</style>

<template>
  <div class="tabs">
    <div id="tabs" ref="tabs" class="tabs__select">
      <div
        v-for="tabItem in tabs"
        :key="tabItem.name"
        class="tabs__select__item"
        :class="{'tabs__select__item--active': tabItem.name === status.activeTab}"
        @click="handleClick(tabItem)"
      >
        {{ tabItem.text }}
      </div>
    </div>
    <div class="tabs__content">
      <slot :name="status.activeTab"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      status: {
        activeTab: this.tabs.length > 0 ? this.tabs[0].name : ''
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleClick (tabItem) {
      this.status.activeTab = tabItem.name
      this.$emit('select', tabItem)
    }
  }
}
</script>
