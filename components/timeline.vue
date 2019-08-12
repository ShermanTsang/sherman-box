<style lang="scss">
  .timeline {
    max-width: 1440px;
    position: relative;
    margin: auto;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      height: auto;
      bottom: 0;
      transform: translateX(-50%);
      width: 4px;
      background-color: #f1f1f1;
    }

    &__item {
      width: calc(50% - 80px);
      float: left;
      padding: 20px;
      clear: both;
      text-align: right;

      &:not(:first-child) {
        margin-top: -60px;
      }

      &__date {
        font-size: 1.1rem;
        letter-spacing: 1px;
        margin-bottom: 20px;
        position: relative;
        color: #999;

        &__icon {
          position: absolute;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 100%;
          top: 50%;
          transform: translateY(-50%);
          right: -125px;
          box-shadow: 0 0 4px rgba(177,177,177,.4);
          z-index: 1000;
          background-color: white;
        }

      }

      &__body {
        color: #aaa;

        p {
          line-height: 1.4em;
        }
      }

      &:nth-child(2n) {
        text-align: left;
        float: right;

        .timeline {
          &__item {
            &__date {
              &__icon {
                left: -125px;
              }
            }
          }
        }
      }
    }

    @media ($screen-xs-max) {
      &:before {
        opacity: .5;
      }

      &__item {
        width: 96%;
        padding: 0;
        margin: 30px 0;

        &:not(:first-child) {
          margin-top: 0;
        }

        &__date {
          font-size: .95rem;
          background-color: rgba(255,255,255,.5);
          margin-bottom: 14px;

          &__icon {
            display: none;
          }
        }
      }
    }

  }
</style>

<template>
  <div class="timeline">
    <div v-for="(item,index) in timeline" :key="`${item.module}-${item.id}`" class="timeline__item">
      <div class="timeline__item__date">
        <moment from-now :time="item[$getModuleConfig(item.module).date]" type="date" />
        <div class="timeline__item__date__icon">
          <icon :name="$getModuleConfig(item.module).icon" size="24px" color="#aaa"></icon>
        </div>
      </div>
      <div class="timeline__item__body">
        <item-common :item="item" :align="index % 2 === 0 ? 'right': 'left'"></item-common>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    timeline: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {}
}
</script>
