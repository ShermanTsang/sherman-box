<style lang="scss">
</style>

<template>
  <LayoutContainer class="search">
    <Card class="mx-auto max-w-3xl p-4 my-4 relative">
      <div class="text-base text-gray-500">
        <Lottie name="box2" :height="240" />
        <span v-if="$route.query.name" class="text-blue-400 mr-2">{{ $route.query.name }}</span>
        你有一份“曾小满的盒子”，里面是关于我们的记忆，感谢查收！
        <div class="hidden lg:block text-blue-600 py-2 text-center">
          可长按扫码进入！
        </div>
      </div>
      <div class="hidden lg:block">
        <QrCode v-if="data.pageUrl" :size="140" color-dark="#666" class="absolute right-2 top-2">
          {{ data.pageUrl }}
        </QrCode>
      </div>
      <div class="py-4">
        <FormItem
          v-model="form.name"
          validate="required|minLength:2|maxLength:8"
          label="你的名字"
          name="name"
          :default-value="$route.query.name || ''"
          type="input"
          placeholder="点击这里输入你的真实姓名"
          @changeValidate="valid => state.validate.name = valid"
        />
        <FormItem
          v-model="form.monument"
          label="选择纪念碑"
          name="monument"
          type="select"
          :default-value="2022"
          validate="required"
          :options="[{text:'2022年小满节，主题“我们”', value: 2022}]"
          @changeValidate="valid => state.validate.monument = valid"
        >
        </FormItem>
      </div>
      <Btn :full-width="true" :colorful="true" height="46px" class="mt-6" @click="enterBox()">
        打开盒子
      </Btn>
    </Card>
  </LayoutContainer>
</template>

<script>
export default {
  data () {
    return {
      data: {
        pageUrl: ''
      },
      state: {
        validate: {
          name: false,
          monument: false
        }
      },
      form: {
        name: '',
        monument: ''
      }
    }
  },
  head () {
    return {
      title: '纪念碑',
      meta: [
        {
          hid: 'index',
          name: 'description',
          content: this.$getSeoInfo('description', '搜索')
        }
      ]
    }
  },
  watchQuery: ['name'],
  mounted () {
    this.data.pageUrl = window.location.href
  },
  methods: {
    enterBox () {
      if (this.$checkFormValidate(this.state.validate)) {
        this.$router.push({ path: `/monument/${this.form.monument}`, query: { name: this.form.name } })
      } else {
        this.$message.error('表单填写有误')
      }
    }
  }
}
</script>
