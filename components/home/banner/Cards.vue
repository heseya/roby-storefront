<template>
  <div v-if="media?.length" class="banner-cards">
    <HomeBannerCard
      v-for="image in media"
      :key="image.id"
      :title="image.title"
      :subtitle="image.subtitle"
      :link="image.url"
      :media="image.media"
      class="banner-cards__card"
      :gradient="gradient"
    />
  </div>
</template>

<script setup lang="ts">
import type { BannerMedia } from '@heseya/store-core'

defineProps<{
  media?: BannerMedia[]
  gradient?: boolean
}>()
</script>

<style lang="scss" scoped>
.banner-cards {
  width: 100%;
  @include flex-column;

  @media ($viewport-9) {
    flex-direction: row;
  }

  &__card {
    min-height: 240px;

    @media ($viewport-9) {
      min-height: 400px;
    }
  }
}
</style>
