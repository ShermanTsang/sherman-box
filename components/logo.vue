<style lang="scss">
  .logo {
    width: 100%;
    cursor: pointer;
    font-size: 1.2rem;

    img {
      width: 85%;
      max-width: 220px;
    }

  }
</style>

<template>
  <nuxt-link to="/" class="logo">
    <img :src="$getImageAsset('logo')" alt="logo">
  </nuxt-link>
</template>
