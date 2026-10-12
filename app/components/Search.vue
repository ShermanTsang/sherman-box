<style lang="scss">
$prefix: 'search';

.#{$prefix} {
    &__button {
      cursor: pointer;
    }

    &__main {
      &__input {
        outline: none;
        color: #999;
        letter-spacing: 2px;
        width: 100%;
        padding: 10px;
        max-width: 100%;
        line-height: 24px;
        transition: all .2s ease-in-out;
        background-size: 28px;
        font-size: 1.4rem;
        border: none;
        text-align: center;

        &:focus {
          background-color: rgba(177,177,177,.1);
        }
      }
    }
  }
</style>

<template>
  <div class="search">
    <div class="search__trigger" @click="openModal">
      <slot>
        <div class="search__button">
          <Icon name="search" color="#999" size="18px"></Icon>
        </div>
      </slot>
    </div>
    <Modal v-model:showModal="state.showModal" title="搜索" icon="search" width="800px">
      <div class="search__main">
        <input
          v-model="form.keyword"
          class="search__main__input"
          type="text"
          minlength="2"
          maxlength="15"
          placeholder="请输入关键字..."
          @keyup.enter="search"
        >
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useMessage } from '~/composables/useMessage'

defineOptions({ name: "Search" })

const route = useRoute()
const router = useRouter()
const message = useMessage()
const state = reactive({ showModal: false })
const routeKeyword = route.query.keyword
const form = reactive({ keyword: Array.isArray(routeKeyword) ? routeKeyword[0] : routeKeyword || '' })

function openModal () {
  state.showModal = true
}

function search () {
  const keyword = form.keyword.replace(/\s/g, '')
  if (!keyword) {
    message.error('关键字不能为空')
    return
  }

  void router.push({ name: 'search', query: { keyword } })
  state.showModal = false
}
</script>
