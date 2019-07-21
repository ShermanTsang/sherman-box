<style lang="scss">
  .logo {
    width: 120px;
    display: inline-flex;
    cursor: pointer;
    font-size: 1.2rem;

    img {
      height: 34px;
    }
  }
</style>

<template>
  <nuxt-link to="/" class="logo">
    <img :src="$getImageAsset('logo')" alt="logo">
  </nuxt-link>
</template>
