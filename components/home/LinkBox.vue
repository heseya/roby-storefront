<template>
  <div class="link-box" :style="{ backgroundImage: `url(${link.src})` }">
    <LayoutHeader class="link-box__header">{{ link.text }}</LayoutHeader>
    <NuxtLink :to="link.link">
      <LayoutButton class="link-box__btn" :label="link.linkText" variant="secondary" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
export type LinkBox = {
  text: string
  src: string
  link: string
  linkText: string
}

defineProps<{
  link: LinkBox
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

  &__header {
    text-shadow: 0 4px 6px #0000001a;
    @media ($max-viewport-9) {
      font-size: rem(16);
    }
  }

  @include background-image-basic;

  @media ($max-viewport-9) {
    height: 200px;
  }
}
</style>
