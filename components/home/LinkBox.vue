<template>
  <div class="link-box" :style="{ backgroundImage: `url(${backgroundSrc})` }">
    <LayoutHeader>{{ text }}</LayoutHeader>
    <NuxtLink :to="link">
      <LayoutButton class="link-box__btn" :label="linkText" variant="secondary" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text: string
  backgroundSrc: string
  link: string
  linkText: string
}>()
</script>

<style lang="scss" scoped>
.link-box {
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;

  &__btn {
    width: 200px;
  }

  @include background-image-basic;
}
</style>
