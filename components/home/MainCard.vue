<template>
  <nuxt-link class="main-card" :to="link">
    <div class="main-card__container" :style="{ backgroundImage: `url(${backgroundSrc})` }">
      <LayoutHeader class="main-card__title">{{ title }}</LayoutHeader>
      <LayoutHeader class="main-card__subtitle">{{ subtitle }}</LayoutHeader>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle: string
  backgroundSrc: string
  link: string
}>()
</script>

<style lang="scss" scoped>
.main-card {
  flex: 1;
  text-decoration: none;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 50px;
    height: 100%;

    @include background-image-basic;
  }

  &__title {
    font-weight: normal;
    font-size: rem(20);
    text-align: left;
    color: $white-color;
  }

  &__subtitle {
    text-align: left;
  }
}
</style>
