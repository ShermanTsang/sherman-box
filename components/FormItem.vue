<style lang="scss">
$prefix: 'form-item';

.#{$prefix} {

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
      border-bottom: 1px solid #ddd;
    }
  }

  &__error {
    display: block;
    margin-top: 10px;

    span {
      background-color: rgba(orangered, .1);
      margin: 10px 4px;
      padding: 4px 8px;
      color: orangered;
      font-size: .9rem;
    }
  }

  &__tip {
    margin: 10px 0;
    color: $theme-color;
    font-size: .9rem;
  }

}
</style>

<template>
  <div class="form-item" :style="style">
    <div class="form-item__name">
      <label :for="name">{{ label }}</label><span v-if="isRequired">*</span>
    </div>
    <div class="form-item__content">
      <template v-if="type === 'input'">
        <input
          :id="name"
          v-model="data.value"
          :name="name"
          :placeholder="placeholder"
        >
      </template>
      <template v-if="type === 'textarea'">
        <textarea
          :id="name"
          v-model="data.value"
          :name="name"
          :placeholder="placeholder"
          class="border border-solid border-gray-300 px-4 py-2 bg-white w-full"
        />
      </template>
      <template v-if="type === 'select'">
        <select
          :id="name"
          v-model="data.value"
          :name="name"
          class="border border-solid border-gray-400 rounded px-4 py-2 bg-white"
        >
          <template v-if="options && options.length > 0">
            <option v-for="item in options" :key="item.value" :value="item.value" class="bg-white">
              {{ item.text }}
            </option>
          </template>
        </select>
      </template>
      <slot v-if="type === 'custom'"></slot>
    </div>
    <div v-if="$slots.tip" class="form-item__tip">
      <slot name="tip"></slot>
    </div>
    <div v-if="data.errors.length > 0" class="form-item__error">
      <span v-for="error in data.errors" :key="error">
        {{ error }}
      </span>
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
    defaultValue: {
      type: [String, Number],
      default: null
    },
    validate: {
      type: String,
      default: ''
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
      validator (value) {
        return ['custom', 'input', 'textarea', 'select'].includes(value)
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: {
        value: '',
        errors: []
      }
    }
  },
  computed: {
    style () {
      return {}
    },
    isRequired () {
      const validate = this.validate
      if (validate) {
        return validate.toString().includes('required')
      }
      return false
    },
    validateRules () {
      const validate = this.validate
      if (!validate) {
        return []
      }
      const finalRules = []
      if (validate.includes('|')) {
        const rules = validate.split('|')
        for (const rule of rules) {
          if (rule) {
            finalRules.push(rule.includes(':')
              ? { [rule.split(':')[0]]: rule.split(':')[1] }
              : { [rule]: true })
          }
        }
      } else {
        finalRules.push(validate.includes(':')
          ? { [validate.split(':')[0]]: validate.split(':')[1] }
          : { [validate]: true })
      }
      return finalRules
    }
  },
  watch: {
    'data.value' (value) {
      this.changeValue(value)
      this.checkValidate(value)
    }
  },
  mounted () {
    if (this.defaultValue !== null) {
      this.data.value = this.defaultValue
    }
  },
  methods: {
    changeValue (currentValue) {
      this.$emit('updateValue', currentValue)
    },
    checkValidate (currentValue) {
      this.data.errors = []
      const validateRules = this.validateRules

      if (validateRules && validateRules.length > 0) {
        for (const ruleItem of validateRules) {
          if ('required' in ruleItem) {
            if (currentValue === null) {
              this.data.errors.push(this.label + ' 不能为空')
            }
          } else if (currentValue && currentValue.length > 0) {
            if ('maxLength' in ruleItem) {
              if (!(currentValue.length <= ruleItem.maxLength)) {
                this.data.errors.push(this.label + ` 超过最大字数限制(${ruleItem.maxLength})`)
              }
            }

            if ('minLength' in ruleItem) {
              if (!(currentValue.length >= ruleItem.minLength)) {
                this.data.errors.push(this.label + ` 小于最小字数限制(${ruleItem.minLength})`)
              }
            }

            if ('number' in ruleItem) {
              if (isNaN(currentValue)) {
                this.data.errors.push(this.label + ' 只能是数值')
              }
            }

            if ('minValue' in ruleItem) {
              if (!(currentValue >= Number.parseInt(ruleItem.minValue))) {
                this.data.errors.push(this.label + ` 不能小于最小值${ruleItem.minValue}`)
              }
            }

            if ('maxValue' in ruleItem) {
              if (!(currentValue <= Number.parseInt(ruleItem.maxValue))) {
                this.data.errors.push(this.label + ` 不能大于最大值${ruleItem.maxValue}`)
              }
            }

            if ('url' in ruleItem) {
              if (!(/^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(currentValue))) {
                this.data.errors.push('网址格式有误')
              }
            }
          }
        }
      }
      const validatePass = this.data.errors.length === 0
      this.$emit('changeValidate', validatePass)
    }
  }
}
</script>
