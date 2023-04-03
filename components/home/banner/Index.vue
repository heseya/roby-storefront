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
    <div class="banner__cards">
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
import { Banner } from '@heseya/store-core'

const props = defineProps<{
  banner: Banner
}>()

const mainImage = computed(() => props.banner?.banner_media[0])

const remainingImages = computed(() => props.banner?.banner_media.slice(1))
</script>

<style lang="scss" scoped>
.banner {
  @include flex-column;
  width: 100%;
  height: 960px;

  &__main-card {
    flex: 1;
  }

  &__cards {
    flex: 1;
    @include flex-column;
    @media ($viewport-9) {
      flex-direction: row;
    }
  }
}
</style>
