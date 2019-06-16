<style lang="scss">
  .tag {
    display: inline-block;

    &__item {
      padding: 4px 8px;
      line-height: 2.5;
      letter-spacing: 1px;
      border: 1px solid #ccc;
      cursor: default;

      &:not(:last-child) {
        margin-right: 10px;
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
