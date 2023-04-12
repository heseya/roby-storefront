<template>
  <div class="index-page">
    <HomeBanner v-if="data?.mainBanner" class="index-page__banner" :banner="data?.mainBanner" />

    <BaseContainer class="index-page__content">
      <HomeLinkBox
        text="Zapytaj o wynajem"
        background-src="https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg"
        link="rent"
        link-text="Zapytaj"
      />
      <HomeWhyUs />
      <HomeImageCarousel title="Nasi partnerzy" :images="imageArr" />
      <HomeImageCarousel
        title="Zaufali Nam"
        :images="imageArr"
        image-width="136"
        image-height="136"
      />
    </BaseContainer>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Strona główna"
  }
}
</i18n>

<script setup lang="ts">
import { ImageSrc } from '~/components/home/ImageCarousel.vue'

const t = useLocalI18n()
const heseya = useHeseya()

useHead({
  title: t('title'),
})

const { data } = useAsyncData(async () => {
  const mainBanner = await heseya.Banners.getOneBySlug('main-banner')
  return { mainBanner }
})

const imageArr: ImageSrc[] = [
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-HSM-Niszczarki.svg',
    alt: 'hsm',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-HSM-Niszczarki.svg',
    alt: 'hsm',
  },
]
</script>

<style lang="scss" scoped>
.index-page {
  &__content {
    > * {
      margin-top: 50px;
    }
  }
}
</style>
