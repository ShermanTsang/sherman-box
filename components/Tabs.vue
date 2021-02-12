<style lang="scss">
$prefix: 'tabs';

.#{$prefix} {
    position: relative;
    margin: 16px 0;

    &__select {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      white-space: nowrap;

      &__item {
        color: #666;
        position: relative;
        letter-spacing: 1px;
        font-size: 1rem;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px;

        i {
          padding-right: 10px;
        }

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
      margin-top: 20px;
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
        :class="{'tabs__select__item--active': tabItem.name === state.activeTab}"
        @click="handleClick(tabItem)"
      >
        <Icon v-if="tabItem.icon" :name="tabItem.icon" />{{ tabItem.text }}
      </div>
    </div>
    <div class="tabs__content">
      <slot :name="state.activeTab"></slot>
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
      state: {
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
      this.state.activeTab = tabItem.name
      this.$emit('select', tabItem)
    }
  }
}
</script>
