<template>
  <div class="partner-carousel">
    <LayoutHeader class="partner-carousel__title" variant="black" tag="h2">
      Zaufanie i współpraca
    </LayoutHeader>

    <LayoutCarousel :items="partners" :breakpoints="breakpoints">
      <template #item="partner: PartnerProps">
        <AboutPartnerCarouselItem :data="partner" />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import { SwiperOptions } from 'swiper/types'
import { PartnerProps } from '@/components/about/partnerCarousel/Item.vue'

import Canon from '@/assets/images/gold-partner.jpg?url'
import Sharp from '@/assets/images/partners/sharp-logo.png?url'
import Asarto from '@/assets/images/partners/asarto-logo.png?url'
import Hsm from '@/assets/images/partners/hsm-logo.png?url'
import Lexmark from '@/assets/images/partners/lexmark-logo.png?url'

const partners: PartnerProps[] = [
  {
    name: 'Canon',
    subname: 'Gold Partner',
    description:
      'Status Partnera Canon Polska to pewność pochodzenia urządzeń oraz gwarancja wysokiej jakości obsługi. Wieloletnia współpraca z marką Canon pozwala nam występować w roli eksperta.',
    image: Canon,
  },
  {
    name: 'Sharp',
    subname: 'Oficjalny Partner',
    description:
      'Kupując u oficjalnego partnera producenta, masz pewność o jakości usług, oraz sprzedawanym towarze. Nasza firma od wielu lat współpracuje z marką Sharp, dostarcza i serwisuje sprzęt, oraz posiada fachową wiedzę.',
    image: Sharp,
  },
  {
    name: 'Asarto',
    description:
      'Nasza współpraca z Asarto daje pewność, że cartridge pochodzą z oficjalnego źródła dystrybucji. Dzięki temu mamy pewność wysokiej jakości dostarczanych materiałów.',
    image: Asarto,
  },
  {
    name: 'HSM',
    description:
      'Jako oficjalny partner HSM gwarantujemy, że dostarczone urządzenia pochodzą z oficjalnego źródła dystrybucji. Posiadają pełną gwarancję, oraz objęte są pełnym wachlarzem wysokiej jakości usługami serwisowymi.',
    image: Hsm,
  },
  {
    name: 'Lexmark',
    description:
      'Oficjalny partner to gwarancja sprawdzonego źródła sprzętu, wysokiej jakości obsługi, oraz pełnej wiedzy technicznej na temat urządzeń.',
    image: Lexmark,
  },
]

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
