<style lang="scss">
.catalog {
  &__item {

    &__main {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dotted #efefef;
      border-bottom: 1px dotted #efefef;
      transition: all .2s ease-in-out;
      opacity: .8;

      &__content {
        padding: 24px 16px;
        width: 100%;
        color: #666;

        @media screen and ($screen-lg-max) {
          padding: 24px 8px;
        }

        &__name {
          font-size: 1.1rem;
          cursor: pointer;

          span {
            margin: 0 6px;
            padding: 1px 10px;
            font-size: .85rem;
            border-radius: 2px;
            background-color: rgba($theme-color, .4);
            color: #fff;
          }
        }

        &__object {
          margin-top: 24px;
          margin-left: 30px;

          @media screen and ($screen-lg-max) {
            margin-left: 10px;
          }

          &__item {
            padding: 16px 0;
            cursor: pointer;
            transition: all .2s ease-in;
            position: relative;
            overflow: hidden;

            &__name {
              color: #666;
              font-size: 1rem;
              letter-spacing: 1px;
            }

            &__info {
              margin-top: 10px;
              font-size: .9rem;
              overflow: hidden;
              letter-spacing: 1px;
              line-height: 1.8;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #999;
            }

            &__image {
              height: 100%;
              width: 240px;
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              opacity: .1;
              transition: all .2s ease-in-out;

              @media screen and ($screen-lg-max) {
                display: none;
              }

              &:before {
                position: absolute;
                content: '';
                background-color: #fff;
                box-shadow: 0 -30px 20px 50px rgb(255, 255, 255);
                top: 0;
                bottom: 0;
                z-index: 1;
              }
            }

            &:hover {
              padding: 16px 10px;

              .catalog__item__main__content__object__item__image {
                opacity: 1;
              }
            }

            &:not(:last-child) {
              border-bottom: 1px solid #eee;
            }
          }
        }
      }

      &:hover {
        box-shadow: 0 0 12px rgba(0, 0, 0, .1);
        opacity: 1;
      }

    }

    &__children {
      margin-left: 30px;

      @media screen and ($screen-lg-max) {
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <div class="catalog">
    <div v-for="item in data" :key="item.id" class="catalog__item">
      <div class="catalog__item__main">
        <div class="catalog__item__main__content">
          <div class="catalog__item__main__content__name" @click="toggleItemBody(item)">
            <Icon
              v-if="item.children"
              :name="state.showBody[item.id] ? 'arrow-down' :'arrow-up'"
              color="#aaa"
            />
            <Icon
              v-else-if="item.items && item.items.length > 0"
              :name="state.showBody[item.id] ? 'arrow-down' :'arrow-up'"
              color="#aaa"
            />
            <Icon v-else name="dot-small" color="#aaa" />
            {{ item.name }}
            <span v-if="item.items.length > 0">{{ item.items.length }}</span>
          </div>
          <transition name="fade">
            <div v-show="state.showBody[item.id]" v-if="item.items && item.items.length > 0" class="catalog__item__main__content__object">
              <nuxt-link
                v-for="entityItem in item.items"
                :key="entityItem.id"
                :to="`/${entityItem.module}/${entityItem.resource_sn}`"
                tag="div"
                class="catalog__item__main__content__object__item"
              >
                <div class="catalog__item__main__content__object__item__name">
                  {{ entityItem.name }}
                </div>
                <div class="catalog__item__main__content__object__item__info">
                  {{ entityItem.text }}
                  <br>
                  <Datetime :time="entityItem.datetime" from-now />
                </div>
                <div v-if="entityItem.image" class="catalog__item__main__content__object__item__image">
                  <Pic :url="entityItem.image" auto-fill />
                </div>
              </nuxt-link>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fade">
        <div v-show="state.showBody[item.id]" class="catalog__item__children">
          <CatalogTree v-if="item.children" :data="item.children" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogTree',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      state: {
        showBody: {}
      }
    }
  },
  computed: {},
  created () {
    this.initStatus()
  },
  methods: {
    toggleItemBody (item) {
      const hasChildren = 'children' in item && item.children.length > 0
      const hasObjects = 'items' in item && item.items.length > 0
      if (hasChildren || hasObjects) {
        this.$set(this.state.showBody, item.id, !this.state.showBody[item.id])
      }
    },
    initStatus (catalogData = this.data) {
      catalogData.forEach((item) => {
        this.$set(this.state.showBody, item.id, true)
        if (item.children) {
          this.initStatus(item.children)
        }
      })
    }
  }
}
</script>
