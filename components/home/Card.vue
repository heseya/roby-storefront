<template>
  <nuxt-link class="card" :to="link">
    <div class="card__container" :style="{ backgroundImage: `url(${backgroundSrc})` }">
      <LayoutHeader class="card__title">{{ title }}</LayoutHeader>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
export interface CardProps {
  title: string
  backgroundSrc: string
  link: string
}

defineProps<CardProps>()
</script>

<style lang="scss" scoped>
.card {
  flex: 1;
  text-decoration: none;

  &__container {
    display: flex;
    align-items: end;
    padding: 50px;
    height: 100%;
    @include background-image-basic;
  }

  &__title {
    width: 50%;
    text-align: left;
  }
}
</style>
