<template>
  <div class="partner-carousel">
    <LayoutHeader class="partner-carousel__title" variant="black" tag="h2">
      {{ title }}
    </LayoutHeader>

    <LayoutCarousel :items="partners || []" :breakpoints="breakpoints">
      <template #item="partner: TranslatedAboutPartner">
        <AboutPartnerCarouselItem :partner="partner" />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import { SwiperOptions } from 'swiper/types'
import { TranslatedAboutPartner } from '@/interfaces/aboutPage'

defineProps<{
  title: string
}>()

const { data: partners } = useAsyncData('about-page-partners', async () => {
  const directus = useDirectus()

  const { data } = await directus.items('AboutPagePartner').readByQuery({
    fields: [
      'translations.name',
      'translations.subtitle',
      'translations.description',
      // @ts-ignore directus typing is wrong
      'logo.filename_disk',
    ],
  })

  return (data?.map((partner) => ({
    // @ts-ignore directus typing is wrong???
    ...getTranslated(partner.translations as any, 'pl-PL'),
    logo: partner.logo,
  })) || []) as TranslatedAboutPartner[]
})!

const breakpoints: Record<number, SwiperOptions> = {
  480: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  992: { slidesPerView: 'auto', spaceBetween: 20 },
}
</script>

<style lang="scss" scoped>
.partner-carousel {
  &__title {
    margin-bottom: 25px;
    text-align: left;
    font-size: rem(30);

    @media ($max-viewport-9) {
      font-size: rem(20);
    }
  }
}
</style>
