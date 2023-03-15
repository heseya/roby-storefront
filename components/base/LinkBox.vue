<template>
  <div class="link-box__background" :style="{ backgroundImage: `url(${backgroundSrc})` }">
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
.link-box__background {
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;

  background-color: $gray-color-600;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
