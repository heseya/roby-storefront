<template>
  <NuxtLink class="card" :class="{ 'card--centered': centered }" :to="link">
    <div class="card__container" :class="{ 'card__container--centered': centered }">
      <Media object-fit="cover" :media="selectedMedia" class="card__image" />
      <LayoutHeader v-if="showSubtitle" class="card__subtitle">
        {{ subtitle }}
      </LayoutHeader>
      <LayoutHeader class="card__title"> {{ title }} </LayoutHeader>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CdnMedia } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    title: string | null
    subtitle?: string | null
    media: {
      min_screen_width: number
      media: CdnMedia
    }[]
    link: string
    centered?: boolean
  }>(),
  { subtitle: '' },
)

// Temporary fix, as subtitle is required in API
const showSubtitle = computed(() => props.subtitle && props.subtitle !== '-')

// TODO: handle responsive media
const selectedMedia = computed(() => props.media[0].media)
</script>

<style lang="scss" scoped>
.card {
  flex: 1;
  text-decoration: none;

  &__container {
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
      gap: 12px;
    }
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
  }

  &__title {
    text-align: left;
    font-size: rem(26);
    line-height: rem(34);
    position: relative;
    text-transform: uppercase;
    z-index: 1;
  }

  &__subtitle {
    text-align: left;
    font-weight: 400;
    font-size: rem(20);
    line-height: rem(26);
    text-transform: uppercase;
    z-index: 1;
  }

  &:hover &__image {
    transform: scale(1.05);
  }
}
</style>