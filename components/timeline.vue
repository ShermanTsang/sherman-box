<style lang="scss">
  .timeline {
    position: relative;
    width: calc(100% - 100px);
    margin: auto;
    left: -5px;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top:0;
      left:50%;
      height: auto;
      bottom:0;
      transform:translateX(-50%);
      width:4px;
      background-color: #eee;
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
        font-size: 1.2rem;
        margin-bottom: 12px;
        position: relative;
        color: #666;

        &:before {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border: 4px solid #666;
          background-color: #1D1D1D;
          border-radius: 100%;
          top: 50%;
          transform: translateY(-50%);
          right: -73px;
          z-index: 1000;
        }

        &.big:before {
          width: 24px;
          height: 24px;
          transform: translate(8px, -50%);
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

        &__date {
          &:before {
            left: -63px;
          }

          &.big:before {
            transform: translate(-8px, -50%);
          }
        }
      }
    }
  }
</style>

<template>
  <div class="timeline">
    <div v-for="item in timeline" :key="`${item.module}-${item.id}`" class="timeline__item">
      <div class="timeline__item__date">
        <moment from-now :time="item.date" type="date" />
      </div>
      <div class="timeline__item__body">
        <item-common :item="item"></item-common>
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
