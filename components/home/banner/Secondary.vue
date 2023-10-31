<template>
  <div class="secondary-banner">
    <HomeBannerCards :media="banner?.banner_media" :gradient="isGradient" />
  </div>
</template>

<script setup lang="ts">
import { Banner } from '@heseya/store-core'

const props = defineProps<{
  banner: Banner
}>()

const isGradient = computed(() => !props.banner?.metadata?.hide_gradient)
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
