<style lang="scss">
$prefix: 'infoCell';

.#{$prefix} {
  display: flex;
  flex-flow: row nowrap;
  padding: 16px 12px;
  transition: all .2s ease-in-out;
  border-radius: 6px;
  border-top: 1px solid #efefef;

  &__icon {
    padding: 0 10px;
    i {
      transition: all .2s ease-in-out;
    }
  }

  &__main {
    margin-left: 10px;

    &__name {
      color: #333;
      font-size: 1.05rem;
      letter-spacing: 2px;
    }

    &__content {
      margin-top: 16px;
    }

  }

  &:hover {
    border-top: 1px solid transparent;
    background-image: linear-gradient(120deg, rgba(229, 229, 229, 0.2) 0%, rgba(255, 255, 255, 0.8) 79%);

    .infoCell__icon {
      i {
        transform: scale(1.1);
      }
    }

  }

}
</style>

<template>
  <div class="infoCell">
    <div v-if="icon" class="infoCell__icon" :style="{lineHeight: iconSize}">
      <Icon :name="icon" size="24px" color="#333" />
    </div>
    <div class="infoCell__main">
      <div class="infoCell__main__name" :style="{lineHeight: iconSize}">
        {{ name }}
      </div>
      <div class="infoCell__main__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCell',
  props: {
    icon: {
      type: String,
      default: undefined
    },
    iconSize: {
      type: String,
      default: '24px'
    },
    name: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
