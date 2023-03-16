<template>
  <div class="link-box" :style="{ backgroundImage: `url(${backgroundSrc})` }">
    <LayoutHeader>{{ text }}</LayoutHeader>
    <nuxt-link :to="link">
      <LayoutButton :label="linkText" variant="secondary" />
    </nuxt-link>
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

  @include background-image-basic;
}
</style>
