<style lang="scss">
  .tag {

    &__item {
      display: inline-block;
      overflow: hidden;
      position: relative;
      cursor: default;
      font-size: .9rem;
      margin: 1px;
      padding: 6px 10px;
      white-space: nowrap;
      color: #666;
      background-color: #fff;
      border: 1px solid #ddd;
      letter-spacing: 1px;
      transition: all .2s ease-in;

      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>

<template>
  <div class="tag">
    <span v-if="tagLength === 1" class="tag__item"><slot></slot></span>
    <span v-for="item in tagResult" v-else :key="item" class="tag__item">{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data() {
    return {
      tagValue: this.$slots.default[0].text
    }
  },
  computed: {
    tagLength() {
      try {
        const hasMany = this.tagValue.indexOf(',') !== -1
        if (hasMany) {
          const tagArray = this.tagValue.split(',')
          return tagArray.length
        }
        return 1
      } catch (e) {
        return 1
      }
    },
    tagResult() {
      return this.tagValue.split(',')
    }
  }
}
</script>
