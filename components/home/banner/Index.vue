<template>
  <HomeBannerCarousel v-if="bannerType === BannerType.Carousel" :banner="banner" />
  <HomeBannerStatic v-else :banner="banner" />
</template>

<script lang="ts" setup>
import { Banner } from '@heseya/store-core'

const BannerType = {
  Static: 'static',
  Carousel: 'carousel',
} as const

const props = defineProps<{
  banner: Banner
}>()

const bannerType = computed(() => props.banner?.metadata?.display_type || BannerType.Carousel)
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
