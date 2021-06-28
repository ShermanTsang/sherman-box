<style lang="scss">
$prefix: 'menu';

.#{$prefix} {

    &--vertical {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;

      &__item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        width: 100%;
        cursor: pointer;
        padding: 20px 16px;
        font-size: .95rem;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: transform .3s ease-in-out;

        &__icon {
          transition: all .25s ease-in-out;
          transform-origin: center bottom;

          i {
            color: #999;
            margin-right: 10px;
          }
        }

        &__name {
          margin-left: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 4px;

          span {
            margin-left: 6px;
            letter-spacing: 1px;
            font-size: .8rem;
            color: #999;
            text-transform: capitalize;
          }
        }

        &:hover {
          transform: scale(1.05);
        }
      }

      &__item--active {
        position: relative;
        @include gradient-background;

        &:hover {
          border-radius: 0;
        }
      }

    }

    &--horizontal {
      position: relative;
      height: $header-main-height;
      line-height: $header-main-height;

      &__item {
        text-align: center;
        display: inline-block;
        position: relative;
        padding: 0 20px;
        cursor: pointer;
        font-size: 1rem;
        letter-spacing: 2px;
        transition: all .2s ease-in;
        color: #666;

        i {
          display: none;
          color: #aaa;
        }

        &:hover {
          letter-spacing: 3px;

          i {
            display: inline-block;
          }
        }
      }

      &__item--normal {
        @media screen and ($screen-md-max) {
          display: none;
        }
      }

      &__item--active {
        position: relative;
        color: $theme-color;

        i {
          display: inline-block;
          color: $theme-color;
        }

        &:before {
          transition: .2s ease-in-out;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          right: 0;
          background-color: rgba($theme-color,.5);
          height: 4px;
          content: '';
          opacity: 0.5;
        }

      }

      &__item--button {
        display: none;

        i {
          display: inline-block;
        }

        @media screen and ($screen-md-max) {
          display: inline-block;
        }
      }

    }

  }
</style>

<template>
  <div class="menu">
    <div v-if="!state.showModal" class="menu--horizontal">
      <div
        class="menu--horizontal__item menu--horizontal__item--button"
        :class="{'menu--horizontal__item--active': state.showModal}"
        @click="state.showModal = !state.showModal"
      >
        <Icon name="menu" size="20px" color="#666" />
      </div>
      <div
        v-for="(item,index) in $store.getters.moduleList"
        :key="index"
        :class="{'menu--horizontal__item--active': isActiveMenu(item)}"
        class="menu--horizontal__item menu--horizontal__item--normal"
        @click="clickModalMenu(item.slug)"
      >
        <Icon :name="item.icon" />
        <CustomText display="inline">
          {{ item.name }}
        </CustomText>
      </div>
    </div>
    <Modal v-model="state.showModal" icon="menu" title="模块" width="500px">
      <div class="menu--vertical">
        <div
          v-for="(item,index) in $store.getters.moduleList"
          :key="index"
          :class="{'menu--vertical__item--active': isActiveMenu(item)}"
          class="menu--vertical__item"
          @click="clickModalMenu(item.url)"
        >
          <div class="menu--vertical__item__icon">
            <Icon :name="item.icon" size="24px" />
          </div>
          <div class="menu--vertical__item__name web-font">
            <CustomText display="inline">
              {{ item.name }}
            </CustomText>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {},
  data () {
    return {
      state: {
        showModal: false
      }
    }
  },
  methods: {
    isActiveMenu (menuItem) {
      const { url } = menuItem
      const path = this.$route.path
      const inIndexPage = url === 'timeline' && path === '/'
      return path.indexOf(url) > 0 || inIndexPage
    },
    clickModalMenu (url) {
      this.$router.push(`/${url}`)
      if (this.state.showModal) {
        this.state.showModal = false
      }
    }
  }
}
</script>
