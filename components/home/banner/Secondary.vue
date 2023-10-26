<template>
  <div class="secondary-banner">
    <HomeBannerCards :media="banner?.banner_media" />
  </div>
</template>

<script setup lang="ts">
import { Banner } from '@heseya/store-core'

defineProps<{
  banner: Banner
}>()
</script>

<style lang="scss" scoped>
.secondary-banner {
  max-width: 1920px;
  margin: 0 auto;

  :deep(.card) {
    height: 240px;

    @media ($viewport-10) {
      height: 400px;
    }
  }
}
</style>
