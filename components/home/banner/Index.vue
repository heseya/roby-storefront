<template>
  <div class="banner">
    <div class="banner__main-card">
      <HomeBannerCard
        :title="mainImage.title"
        :subtitle="mainImage.subtitle"
        :link="mainImage.url"
        :media="mainImage.media"
        centered
      />
    </div>
    <div class="banner__cards" :style="{ flex: remainingImages.length }">
      <HomeBannerCard
        v-for="image in remainingImages"
        :key="image.id"
        :title="image.title"
        :subtitle="image.subtitle"
        :link="image.url"
        :media="image.media"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Banner, BannerMedia } from '@heseya/store-core'

const props = defineProps<{
  banner: Banner
}>()

const mainImage = computed(() => props.banner?.banner_media[0])

const remainingImages = computed(() => props.banner?.banner_media.slice(1) as BannerMedia[])
</script>

<style lang="scss" scoped>
.banner {
  @include flex-column;
  width: 100%;
  height: 960px;

  &__main-card {
    flex: 1;
    @media ($viewport-9) {
      flex-direction: row;
    }
  }

  &__cards {
    @include flex-column;
    @media ($viewport-9) {
      flex: 1 !important;
      flex-direction: row;
    }
  }
}
</style>
