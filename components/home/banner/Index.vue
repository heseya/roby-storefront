<template>
  <HomeBannerCarousel v-if="bannerType === BannerType.Carousel" :banner="banner" />
  <HomeBannerStatic v-else :banner="banner" />
</template>

<script lang="ts" setup>
import { Banner } from '@heseya/store-core'
import { BannerType } from '~/consts/banner'

const props = defineProps<{
  banner: Banner
}>()

const bannerType = computed(() => props.banner?.metadata?.display_type || BannerType.Static)
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
