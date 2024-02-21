<template>
  <SmartLink :to="link.link || ''" class="link-box">
    <LazyMedia
      v-for="m in link.media"
      :key="m.media.id"
      :media="m.media"
      class="link-box__media"
      height="400"
      object-fit="cover"
    />

    <LazyLayoutHeader class="link-box__header" tag="h2">{{ link.text }}</LazyLayoutHeader>

    <LazyLayoutButton
      v-if="link.linkText"
      class="link-box__btn"
      :label="link.linkText"
      variant="secondary"
    />
  </SmartLink>
</template>

<script lang="ts" setup>
import type { BannerMedia } from '@heseya/store-core'

export type LinkBox = {
  text: string | null
  media: BannerMedia['media']
  link: string | null
  linkText: string | null
}

const props = defineProps<{
  link: LinkBox
}>()

useMediaQueriesForMediaBanners(props.link.media)
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
  position: relative;
  overflow: hidden;
  text-decoration: none;

  &__media {
    width: 100%;
    height: 100%;
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    z-index: -1;
    transition: 0.3s;
  }

  &:hover &__media {
    transform: scale(1.05);
  }

  &__btn {
    width: 200px;
  }

  &__header {
    text-shadow: 0 4px 6px #0000001a;
    @media ($max-viewport-9) {
      font-size: rem(16);
    }
  }
}
</style>
