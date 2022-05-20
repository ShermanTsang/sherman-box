<style lang="scss">
$prefix: 'tag';

.#{$prefix} {
  display: inline-block;

  &__item {
    display: inline-block;
    overflow: hidden;
    position: relative;
    font-size: .9rem;
    margin: 2px;
    padding: 6px 10px;
    white-space: normal;
    color: #666;
    background-color: transparent;
    border: 1px solid #ddd;
    letter-spacing: 1px;
    transition: all .2s ease-in;
    line-height: 1.4;
    border-radius: 2px;

    &:not(:last-child) {
      margin-right: 5px;
    }

    &:hover {
      border-color: transparent;
      box-shadow: 1px 1px 10px rgba(177, 177, 177, .6);
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
      <span
        v-if="tagLength <= 1"
        :class="`tag__item ${enableSearch ? 'cursor-pointer' : 'cursor-default'}`"
        @click="handleClick"
      ><slot /></span>
      <span
        v-for="tag in tagResult"
        v-else
        :key="tag"
        :class="`tag__item ${enableSearch ? 'cursor-pointer' : 'cursor-default'}`"
        @click="handleClick(tag)"
      >{{ tag }}</span>
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
    },
    enableSearch: {
      type: Boolean,
      default: false,
      required: false
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
      return this.tagValue.split(',').filter(tag => tag !== '')
    }
  },
  methods: {
    handleClick (tag) {
      if (this.enableSearch) {
        const keyword = tag || this.$slots.default[0].text
        this.$router.push({ name: 'search', query: { keyword } })
      }
    }
  }
}
</script>
