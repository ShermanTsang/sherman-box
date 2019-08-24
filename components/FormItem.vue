<style lang="scss">
  .FormItem {

    &:not(:first-child) {
      margin-top: 16px;
    }

    &__name {
      display: block;
      letter-spacing: 2px;
      color: #666;
      font-size: 1rem;
      margin-bottom: 14px;

      span {
        margin-left: 4px;
        font-size: 1rem;
        color: $theme-color;
      }
    }

    &__content {
      input {
        width: 100%;
        font-size: 1rem;
        padding: 0 10px;
        line-height: 34px;
        border: none;
        border-bottom: 1px solid #ddd;
      }
    }

    &__error {
      margin: 10px 0;
      color: orangered;
      font-size: .9rem;
    }

    &__tip {
      margin: 10px 0;
      color: $theme-color;
      font-size: .9rem;
    }

  }
</style>

<template>
  <div class="FormItem" :style="style">
    <div class="FormItem__name">
      <label :for="name">{{ label }}</label><span v-if="isRequired">*</span>
    </div>
    <div class="FormItem__content">
      <input
        v-if="type === 'input'"
        :id="name"
        v-model="data.value"
        v-validate="validate"
        :name="name"
        :placeholder="placeholder"
      >
      <slot v-if="type === 'custom'"></slot>
    </div>
    <div v-if="$slots.tip" class="FormItem__tip">
      <slot name="tip"></slot>
    </div>
    <div v-show="errors.has(name)" class="FormItem__error">
      <span v-for="(item, index) in errors.collect(name)" :key="index">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  model: {
    prop: 'value',
    event: 'updateValue'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    validate: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'custom',
      validator(value) {
        return ['custom', 'input', 'textarea'].includes(value)
      }
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: {
        value: ''
      }
    }
  },
  computed: {
    style() {
      return {}
    },
    isRequired() {
      const validate = this.validate
      if (validate) {
        return validate.toString().indexOf('required') !== -1
      }
      return false
    }
  },
  watch: {
    'data.value'(value) {
      this.changeValue(value)
      this.checkValidate()
    }
  },
  methods: {
    changeValue(value) {
      this.$emit('updateValue', value)
    },
    async checkValidate() {
      const validate = await this.$validator.validate()
      this.$emit('changeValidate', validate)
    }
  }
}
</script>
