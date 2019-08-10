<style lang="scss">
  .logo {
    width: 120px;
    cursor: pointer;
    font-size: 1.2rem;

    img {
      height: 40px;
      opacity: .8;
    }
  }
</style>

<template>
  <nuxt-link to="/" class="logo">
    <img :src="$getImageAsset('logo')" alt="logo">
  </nuxt-link>
</template>
