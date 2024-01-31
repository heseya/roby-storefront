<template>
  <div
    v-if="mainImage"
    class="banner"
    :style="{ height: remainingImages.length > 0 ? '960px' : '480px' }"
  >
    <div class="banner__main-card">
      <HomeBannerCard
        :title="mainImage.title"
        :subtitle="mainImage.subtitle"
        :link="mainImage.url"
        :media="mainImage.media"
        centered
        title-tag="h1"
        :gradient="gradient"
      />
    </div>

    <HomeBannerCards
      v-if="remainingImages.length"
      class="banner__cards"
      :media="remainingImages"
      :gradient="gradient"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Banner, BannerMedia } from '@heseya/store-core'

const props = defineProps<{
  banner: Banner
  gradient?: boolean
}>()

const mainImage = computed(() => props.banner?.banner_media[0])

const remainingImages = computed(() => props.banner?.banner_media.slice(1) as BannerMedia[])
</script>

<style lang="scss" scoped>
.banner {
  @include flex-column;
  width: 100%;

  &__main-card {
    flex: 1;
    @media ($viewport-9) {
      flex-direction: row;
    }

    :deep(.card__title) {
      font-size: rem(46);
      line-height: rem(52);

      @media ($max-viewport-9) {
        font-size: rem(18);
        line-height: rem(22);
      }
    }
  }

  &__cards {
  }
}
</style>
