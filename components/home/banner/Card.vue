<template>
  <SmartLink
    class="card"
    :class="{ 'card--centered': centered }"
    :to="link || ''"
    :aria-label="title || `Redirect to ${link}`"
  >
    <div class="card__container" :class="{ 'card__container--centered': centered }">
      <div v-show="gradient" class="card__gray-filter" />
      <Media
        v-for="m in media"
        :key="m.media?.id"
        object-fit="cover"
        :media="m.media"
        class="card__image"
        :height="height"
        :loading="loading"
        :fetchpriority="loading === 'eager' ? 'high' : 'auto'"
      />
      <LayoutHeader v-show="subtitle" class="card__subtitle">
        {{ subtitle }}
      </LayoutHeader>
      <LayoutHeader class="card__title" :tag="titleTag"> {{ title }} </LayoutHeader>
    </div>
  </SmartLink>
</template>

<script lang="ts" setup>
import type { CdnMedia } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    title: string | null
    titleTag?: string
    subtitle?: string | null
    media: {
      min_screen_width: number
      media: CdnMedia
    }[]
    link?: string | null
    centered?: boolean
    height?: number
    gradient?: boolean
    loading?: 'lazy' | 'eager'
  }>(),
  { titleTag: 'span', subtitle: '', link: '', height: 580, gradient: false, loading: 'lazy' },
)

useMediaQueriesForMediaBanners(props.media)
</script>

<style lang="scss" scoped>
.card {
  text-decoration: none;
  width: 100%;
  height: 100%;

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 50px;
    height: 100%;
    position: relative;
    overflow: hidden;

    &--centered {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 50px 72px;
      gap: 12px;
    }

    @media ($max-viewport-9) {
      padding: 24px 16px;
      justify-content: flex-end;
    }
  }

  &__gray-filter {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;

    background: linear-gradient(180deg, transparent, $gray-filter);
  }

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: $gray-color-600;
    transition: 0.3s;
    transform: scale(1.01);
    display: none;
  }

  &__title {
    text-align: left;
    font-size: rem(26);
    line-height: rem(34);
    position: relative;
    text-transform: uppercase;
    z-index: 1;

    @media ($max-viewport-9) {
      font-size: rem(18);
      line-height: rem(22);
    }
  }

  &__subtitle {
    text-align: left;
    font-weight: 400;
    font-size: rem(22);
    line-height: rem(26);
    text-transform: uppercase;
    z-index: 1;

    @media ($max-viewport-9) {
      font-size: rem(12);
      line-height: rem(16);
    }
  }

  &:hover &__image {
    transform: scale(1.05);
  }
}
</style>
