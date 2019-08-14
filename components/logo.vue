<style lang="scss">
  .logo {
    width: 100%;
    cursor: pointer;
    font-size: 1.2rem;
    max-width: 166px;

    img {
      width: 85%;
    }

  }
</style>

<template>
  <img :src="$getImageAsset('logo')" alt="logo" class="logo" @click="$router.push('/')">
</template>

<script>
export default {
  name: 'Logo'
}
</script>
