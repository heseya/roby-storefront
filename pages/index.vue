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
        :image-width="136"
        :image-height="136"
      />
      <HomeProductCarousel
        title="Urządzenia biurowe"
        :images="printers"
        :image-width="200"
        :image-height="300"
      />
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import { ImageSrc } from '~/components/home/ImageCarousel.vue'

const heseya = useHeseya()

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

const printers = [
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2023/02/iR-ADV-DX-C478-Series-FSL-04-800x800-1.jpg',
    alt: 'printer',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2020/07/Lexmark-XC4140-FRONT.jpg',
    alt: 'printer',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2023/02/iR-ADV-DX-C478-Series-FSL-04-800x800-1.jpg',
    alt: 'printer',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2020/07/Lexmark-XC4140-FRONT.jpg',
    alt: 'printer',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2023/02/iR-ADV-DX-C478-Series-FSL-04-800x800-1.jpg',
    alt: 'printer',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2020/07/Lexmark-XC4140-FRONT.jpg',
    alt: 'printer',
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
