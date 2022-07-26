<style lang="scss" scoped>
section {
  @apply my-8
}

.special-data {
  @apply text-blue-600 px-2 bg-blue-200 bg-opacity-10
}

.collection-box {
  @apply w-full overflow-x-scroll overflow-y-hidden space-x-4 whitespace-nowrap py-1
}
</style>

<template>
  <LayoutContainer class="search">
    <Card class="mx-auto max-w-3xl p-4 my-4">
      <div class="text-lg text-gray-600">
        <Lottie name="gift" :height="240" />
        <section class="space-y-4">
          <Sentence>
            Hey, <span v-if="$route.query.name" class="text-blue-400">{{ $route.query.name }}</span>
            ,你好!
          </Sentence>
          <Sentence>2022年5月21日，二十四节气中的“小满节”。也是在昨天，我成为了26岁的的 “小” 满。</Sentence>

          <Sentence>这也许是一份晚到了一天送给你的“小礼物”、一份打包的关于“我们”的记忆。</Sentence>
          <Sentence class="text-gray-400">
            如果可以的话，可以播放下面的音乐，这样会有更好的体验。
          </Sentence>
          <iframe
            class="my-2"
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            width="100%"
            height="86"
            src="//music.163.com/outchain/player?type=2&id=484056997&auto=1&height=66"
          ></iframe>
        </section>
        <section class="space-y-4">
          <Nameplate title="时光" sub-title="Time" />
          <Lottie name="calendar" :height="180" />
          <Sentence>
            我们一起来回顾下我们的旅途吧，从 <span class="special-data">{{ data.monthCount[0].month }}</span>
            到今日 <span class="special-data">{{ $time().format('YYYY-MM-DD') }}</span> 这期间。
          </Sentence>
          <Sentence>
            在“曾小满的盒子”里，我们一共留下了 <span class="special-data">{{ data.totalCount }}</span> 条
            “记忆线索”。
          </Sentence>
          <Blocker height="20px"></Blocker>
          <template v-if="moduleCount.day">
            <Sentence class="special-data">
              日迹数据 <span class="float-right text-sm">此处仅展示 {{ data.dayCollection.length }} 条</span>
            </Sentence>
            <Sentence>
              在 <span class="text-blue-500">{{ moduleCount.day }}</span>
              天的日子里，你都给我留下了深刻的印象，因为你，这一天变得不一样。
            </Sentence>
            <div class="collection-box">
              <ItemTimeline
                v-for="item in data.dayCollection"
                :key="item.id"
                :item="item"
                class="!inline-flex"
                :open-in-new-window="true"
                orientation="horizontal"
                style="width: 600px !important;"
                text="detail"
              />
            </div>
          </template>
          <template v-if="moduleCount.movie">
            <Sentence class="special-data">
              观影数据 <span class="float-right text-sm">此处仅展示 {{
                data.movieCollection.length
              }} 条</span>
            </Sentence>
            <Sentence>
              我们一同穿梭在 <span class="special-data">{{ moduleCount.movie }}</span>
              部影视作品的光影中（共同观影或你也看过）。
            </Sentence>
            <div class="collection-box">
              <ItemTimeline
                v-for="item in data.movieCollection"
                :key="item.id"
                :item="item"
                class="!inline-flex"
                :open-in-new-window="true"
                orientation="horizontal"
                style="width: 380px !important;"
                text="detail"
              />
            </div>
          </template>
          <template v-if="moduleCount.project">
            <Sentence class="special-data">
              项目数据 <span class="float-right text-sm">此处仅展示 {{
                data.projectCollection.length
              }} 条</span>
            </Sentence>
            <Sentence>
              一同经历过 <span class="special-data">{{ moduleCount.project }}</span> 个作品/项目。
            </Sentence>
            <div class="collection-box">
              <ItemTimeline
                v-for="item in data.projectCollection"
                :key="item.id"
                :item="item"
                class="!inline-flex"
                :open-in-new-window="true"
                orientation="horizontal"
                style="width: 600px !important;"
                text="detail"
              />
            </div>
          </template>
          <template v-if="moduleCount.word">
            <Sentence class="special-data">
              话语记录 <span class="float-right text-sm">此处仅展示 {{ data.wordCollection.length }} 条</span>
            </Sentence>
            <Sentence>
              我还珍藏了 <span class="special-data">{{ moduleCount.word }}</span>
              段你对我讲的话，点染或激励着我。
            </Sentence>
            <div class="collection-box">
              <ItemTimeline
                v-for="item in data.wordCollection"
                :key="item.id"
                :item="item"
                class="!inline-flex"
                :open-in-new-window="true"
                orientation="horizontal"
                style="width: 450px !important;"
                text="detail"
              />
            </div>
          </template>
          <Btn :full-width="true" @click="redirectToTimeline">
            查看完整的 {{ data.totalCount }} 条关于你的记忆
          </Btn>
          <Blocker height="20px"></Blocker>
          <Sentence>感谢你陪我度过的这些时光，平实又珍贵。因为有你的到来，我的生活变得完整而不同。</Sentence>
          <Sentence>希望在未来的日子我们都能在人生路上按照自己的“航海图”前行，做想做的事，爱值得的人。</Sentence>
          <Sentence>
            （对了，还想和你分享：我在去年也遇到了一个很美好、很契合、最重要的是很欣赏的人，虽然现在暂作了分别，但我会努力在过好自己生活的前提下去追寻和追逐，不会放弃！）
          </Sentence>
        </section>
        <section class="space-y-4">
          <Nameplate title="盒子" sub-title="Box" />
          <Lottie name="astronaut" :height="180" />
          <Sentence>给你讲一讲关于“盒子”的故事吧。</Sentence>
          <Blocker height="20px" />
          <Sentence>2008年，我开始捣鼓了一个属于自己的网站，像在茫茫的互联网世界里，开垦了一片自己的“土地”。</Sentence>
          <Blocker height="20px" />
          <Sentence>2012年，我开始用数据的形式记录生活中发生的事情，就像在把一颗颗水珠结在一张网上。</Sentence>
          <Sentence>那时候，我也不知道记录这些数据的意义。</Sentence>
          <Sentence>记录它们，像是在认真地给过往作别，又像是因为怕遗忘而贪心地想留些痕迹。</Sentence>
          <Blocker height="20px" />
          <Sentence>2015年，我发现保持记录是一件有意义并值得坚持的事情，并能从中受益。</Sentence>
          <Sentence>在我迷茫彷徨的时候总能通过对比零零散散的数据，发现我的变化和成长，好的坏的——都是属于我的。</Sentence>
          <Sentence>从那些数据中寻找答案和汲取力量，在平凡的日复一日里，往前走。</Sentence>
          <Blocker height="20px" />
          <Sentence>2017年，我制作了一批实体的“盒子”，送给身边的人们。</Sentence>
          <Sentence>盒子里面装入了糖果和卡片，也装着 我来时路上的故事 和 对未来的憧憬和梦想。</Sentence>
          <Blocker height="20px" />
          <Sentence>2022年，今年，我已迈入社会开始工作有几年时间了，“盒子”已成为了我生活的重要一部分。</Sentence>
          <Sentence>以前，我以为“盒子”里装着的是我，我可以“躲”在这个地方做梦、思考、努力，在必要的时候探出头，和旅人们分享所见所闻所感所得。</Sentence>
          <Blocker height="20px" />
          <Sentence>现在我才发现，“盒子”里是“我们”。</Sentence>
        </section>
        <section class="space-y-4">
          <Nameplate title="名字" sub-title="Name" />
          <!--          <Lottie name="information" :height="180" />-->
          <Sentence>小时候我总想改个名字，因为我会幼稚地认为自己名字里面有个“小”字既显得有些土、也不够洒脱大气、还不够特别。</Sentence>
          <Sentence>更何况，我可不想等我老成了一个步履蹒跚老大爷时，还要被叫成“小满”。</Sentence>
          <Blocker height="20px" />
          <Sentence>后来，名字依然没有改，但我逐渐明白了爸妈给我取这个名字的用意——除了出生于“小满节气”这一天以外，这个名字还隐含了一种人生态度。</Sentence>
          <Blocker height="20px" />
          <Sentence>“花未全开月未圆，半山微醉尽余欢；何须多虑盈亏事，终归小满胜万全”。</Sentence>
          <Sentence>面对不同的事情，都要坚持初心，像谷粒开始变得饱满那样，对未来充满好奇和期待。</Sentence>
          <Sentence>延迟满足感，把握一个度，一直在追求的路上。</Sentence>
          <Blocker height="20px" />
          <Sentence>现在我很喜欢我的名字，它只是一个代号，但我会努力给它赋予更多意义！</Sentence>
        </section>
        <section class="space-y-4">
          <Nameplate title="祝愿" sub-title="Blessing" />
          <Sentence>我把那些回忆装进“盒子”里，轻装上阵前路，也因为有了你陪伴我的过往，我成了现在的我。</Sentence>
          <Sentence>愿我们都能更快乐和丰富，愿我们都收获人生中的“小满”，拥抱“刚刚好”的幸福！</Sentence>
        </section>
        <section class="space-y-4">
          <Nameplate title="话语" sub-title="Words" />
          <Lottie name="contact" :height="180" />
          <Sentence>如果你有什么想说的，可以点击下面的按钮，将那些话写下，我会收到并用心感受。</Sentence>
          <Btn :full-width="true" @click="state.showWordModal = true">
            说点什么
          </Btn>
        </section>
        <section>
          <Nameplate title="期望" sub-title="Hope" />
          <Sentence>我从构思设计到开发一款每个人都能用的“记录人生”的独立产品到现在也有好几年了，因时间有限，“它”可能会迟到但不会缺席。</Sentence>
          <Sentence>未来。也许你也会有一个属于自己的“盒子”，在里面用数据拼接你的生活。</Sentence>
        </section>
      </div>
    </Card>
    <Modal v-model="state.showWordModal" title="说点什么" icon="mail" width="500px">
      <Loading v-if="state.isLoadingSubmit" :fix="true">
        话语提交中
      </Loading>
      <FormItem
        v-model="form.name"
        validate="required|minLength:2|maxLength:4"
        label="姓名"
        name="name"
        type="input"
        placeholder=""
        @changeValidate="valid => state.validate.name = valid"
      />
      <FormItem
        v-model="form.content"
        label="话语"
        name="content"
        type="textarea"
        validate="required"
        placeholder="..."
        @changeValidate="valid => state.validate.content = valid"
      >
      </FormItem>
      <FormItem
        v-model="form.is_private"
        label="公开可见？"
        name="is_private"
        type="select"
        :default-value="1"
        validate="required|number"
        :options="[{text:'不公开显示，仅小满可见', value: 1}, {text:'可以公开显示', value: 0}]"
        @changeValidate="valid => state.validate.is_private = valid"
      >
      </FormItem>
      <Btn
        slot="footer"
        :full-width="true"
        :colorful="true"
        height="48px"
        @click="requestSubmitWord()"
      >
        提交
      </Btn>
    </Modal>
  </LayoutContainer>
</template>

<script>
import Nameplate from '@/components/Nameplate'

export default {
  components: { Nameplate },
  async asyncData ({ $axios, query, $router }) {
    if (!query.name) {
      $router.push({ path: '/monument/' })
    }
    const {
      data: {
        totalCount,
        moduleCount,
        monthCount,
        dayCollection,
        movieCollection,
        projectCollection,
        wordCollection
      }
    } = await $axios.$get('/api/monument/person/', {
      params: {
        name: query.name
      }
    })
    return {
      data: {
        totalCount,
        moduleCount,
        monthCount,
        dayCollection,
        movieCollection,
        projectCollection,
        wordCollection
      }
    }
  },
  data () {
    return {
      state: {
        showWordModal: false,
        isLoadingSubmit: false,
        validate: {
          name: false,
          content: false,
          is_private: false
        }
      },
      form: {
        name: '',
        monument: '',
        is_private: 0
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
  computed: {
    moduleCount () {
      const moduleCount = {
        day: 0,
        movie: 0,
        project: 0,
        word: 0,
        mailbox: 0,
        idea: 0
      }
      this.data.moduleCount.forEach((item) => {
        moduleCount[item.module] = item.count
      })
      return moduleCount
    }
  },
  watchQuery: ['name'],
  mounted () {
    if (!this.$route.query.name) {
      this.$router.push({ path: '/monument/' })
    }
  },
  methods: {
    redirectToTimeline () {
      const routerJump = this.$router.resolve({
        name: 'search',
        query: { keyword: this.$route.query.name }
      })
      window.open(routerJump.href, '_blank')
    },
    requestSubmitWord () {
      if (this.$checkFormValidate(this.state.validate)) {
        const newWord = {
          name: this.form.name,
          content: this.form.content,
          is_private: this.form.is_private,
          is_display: 1,
          date: this.$time(this.time).format('YYYY-MM-DD')
        }

        this.$axios.$post('/api/words', newWord)
          .then((response) => {
            this.state.showWordModal = false
            this.state.isLoadingSubmit = false
            this.$message.info('话语已发送')
          })
          .catch((error) => {
            this.$message.error('提交失败，请稍候再试')
            this.state.isLoadingSubmit = false
          })
      } else {
        this.$message.error('表单填写有误')
      }
    }
  }
}
</script>
