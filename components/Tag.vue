<style lang="scss">
  .tag {
    display: inline-block;

    &__item {
      display: inline-block;
      overflow: hidden;
      position: relative;
      cursor: default;
      font-size: .9rem;
      margin: 1px;
      padding: 6px 10px;
      white-space: normal;
      color: #666;
      background-color: #fff;
      border: 1px solid #ddd;
      letter-spacing: 1px;
      transition: all .2s ease-in;
      line-height: 1.4;

      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>

<template>
  <div class="tag">
    <template v-if="count">
      <span>{{ tagLength }}</span>
    </template>
    <template v-else>
      <span v-if="tagLength <= 1" class="tag__item"><slot /></span>
      <span v-for="item in tagResult" v-else :key="item" class="tag__item">{{ item }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    count: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tagValue: this.$slots.default[0].text || ''
    }
  },
  computed: {
    tagLength () {
      return this.$getStringCount(this.tagValue)
    },
    tagResult () {
      return this.tagValue.split(',')
    }
  }
}
</script>
