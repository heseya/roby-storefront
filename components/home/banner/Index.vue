<template>
  <LazyHomeBannerCarousel
    v-if="bannerType === BannerType.Carousel"
    :banner="banner"
    :gradient="isGradient"
  />
  <LazyHomeBannerStatic v-else :banner="banner" :gradient="isGradient" />
</template>

<script lang="ts" setup>
import type { Banner } from '@heseya/store-core'
import { BannerType } from '~/consts/banner'

const props = defineProps<{
  banner: Banner
}>()

const bannerType = computed(() => props.banner?.metadata?.display_type || BannerType.Static)

const isGradient = computed(() => !props.banner?.metadata?.hide_gradient)
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
