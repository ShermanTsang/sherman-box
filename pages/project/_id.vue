<style lang="scss">
  .project {
    &__header {
      position: relative;
      width: 100%;
      padding: 60px 0;
      overflow: hidden;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;

      &__image {
        overflow: hidden;
        max-height: 405px;
        max-width: 270px;
        box-shadow: 0 45px 100px rgba(0, 0, 0, 0.4);
        img {
          border-radius: 4px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__name {
        color: #fff;
        text-shadow: 0 0 10px rgba(0, 0, 0, .5);
        cursor: default;
        font-size: 1.5rem;
        padding: 0 20px;
        letter-spacing: 2px;
      }

      &__info {
        display: block;
        text-align: center;
        padding: 10px;
        font-size: 1rem;
        letter-spacing: 1px;
        border-top: 1px solid rgba(255,255,255,.2);
        border-bottom: 1px solid rgba(255,255,255,.2);
      }
    }

  }
</style>

<template>
  <div class="project">
    <div class="project__header">
      <div class="project__header__image">
        <img :src="$getImageUrl(data.projectItem.image)" cross-origin="anonymous">
      </div>
      <blocker height="20px" />
      <div class="project__header__name">
        {{ data.projectItem.name }}
      </div>
      <blocker height="20px" />
      <div class="project__header__info">
        {{ $time(data.projectItem.datetime).format('YYYY-MM-DD') }} / {{ $time(data.projectItem.datetime).fromNow() }}
        <br>
        {{ data.projectItem.people }}
      </div>
    </div>
    <blocker height="60px" />
    <container class="project__content" :max-width="960">
      <nameplate title="想法" sub-title="thinking" />
      <markdown :content="data.projectItem.comment || ''" />
    </container>
    <blocker height="40px" />
    <container :max-width="960">
      <comment :data="data.projectItem.comments" />
    </container>
    <blocker height="60px" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ $axios, params }) {
    const { data: projectItem } = await $axios.$get(`/api/projects/${params.id}`)
    return {
      data: {
        projectItem
      }
    }
  },
  mounted() {
    this.renderGradientColor('.project__header')
  },
  methods: {
    renderGradientColor(selector) {
      this.$grade(document.querySelectorAll(selector))
    }
  }
}
</script>
