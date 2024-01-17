<template>
  <SmartLink
    :to="banner.url || ''"
    class="product-page-banner"
    :class="{ 'product-page-banner--interactive': banner.url }"
  >
    <Media
      v-for="m in banner.media"
      :key="m.media.id"
      :media="m.media"
      class="product-page-banner__media"
      width="1200"
      object-fit="cover"
    />
  </SmartLink>
</template>

<script lang="ts" setup>
import { BannerMedia } from '@heseya/store-core'

const props = defineProps<{
  banner: Omit<BannerMedia, 'published'>
}>()

useMediaQueriesForMediaBanners(props.banner.media)
</script>

<style lang="scss" scoped>
.product-page-banner {
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
    display: none;
    z-index: -1;
    transition: 0.3s;
  }

  &--interactive:hover &__media {
    transform: scale(1.01);
  }
}
</style>
