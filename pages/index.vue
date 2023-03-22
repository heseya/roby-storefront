<template>
  <div class="index-page">
    <div>
      <h1 class="index-page__title">{{ t('home.title') }}</h1>
      <br />
      <PaginationPerPageSelect v-model="perPage" />
      <br />
      <Pagination :current="currentPage" :total="totalPages" @go="(v) => (currentPage = v)" />
      <br />
      <ProductMiniature
        v-for="product in products?.data || []"
        :key="product.id"
        :product="product"
        style="margin-bottom: 80px"
      />
      <br />
      <HomeLinkBox
        text="ZAPYTAJ O WYNAJEM"
        background-src="https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg"
        link="rent"
        link-text="Zapytaj"
      />
      <br />
      <HomeBanner />
      <br />
      <HomeWhyUs />
      <br />
      <div style="width: 80vw">
        <HomeCarousel :title="t('home.ourPartners')" :imageArr="imageArr" />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "home": {
      "title": "***REMOVED***",
      "ourPartners": "Nasi partnerzy"
    }
  }
}
</i18n>

<script setup lang="ts">
import { ImageSrc } from '~/components/home/Carousel.vue'

const { t } = useI18n({
  useScope: 'local',
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
  margin: 200px auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__title {
    display: block;
    font-weight: 600;
    font-size: 100px;
    color: var(--primary-color);
    letter-spacing: 1px;
  }
}
</style>
