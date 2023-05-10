<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumb" />
    <BaseContainer class="contact">
      <div>
        <div class="contact__header">
          <LayoutHeader class="contact__title" variant="black" tag="h1">
            ROBICAN S.C.R. JASTRZĘBSKI I WSPÓLNICY
          </LayoutHeader>
          <span>UL. ZAKOPIAŃSKA 190, 60-467 POZNAŃ</span>
        </div>
        <div class="contact__info">
          <ContactInfoCard v-for="(data, index) in contacts" :key="index" :data="data" />
        </div>
      </div>

      <div>
        <LayoutHeader class="contact__subtitle" variant="black" tag="h2">
          Dział handlowy
        </LayoutHeader>
        <div class="contact__persons">
          <ContactPersonCard v-for="(person, index) in persons" :key="index" :data="person" />
        </div>
      </div>
      <div>
        <LayoutHeader class="contact__subtitle" variant="black" tag="h2">
          Dział serwisu
        </LayoutHeader>
        <div class="contact__persons">
          <ContactPersonCard
            v-for="(person, index) in servicePersons"
            :key="index"
            :data="person"
          />
        </div>
      </div>
    </BaseContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { InfoCardProps } from '~/components/contact/InfoCard.vue'
import { PersonCardProps } from '~/components/contact/PersonCard.vue'

import AvatarRobert from '@/assets/images/avatars/robert.png?url'
import AvatarMarcin from '@/assets/images/avatars/marcin.jpeg?url'
import AvatarArkadiusz from '@/assets/images/avatars/arkadiusz.png?url'

const breadcrumb = [
  {
    label: 'Kontakt',
    link: '/kontakt',
  },
]

const persons: PersonCardProps[] = [
  {
    name: 'Robert Jastrzębski',
    email: 'biuro@***REMOVED***.pl',
    phone: 'tel.: +48 604 858 045',
    description:
      'Urządzenia wielofunkcyjne, urządzenia wielkoformatowe/plotery, urządzenia wysokonakładowe',
    link: 'https://www.linkedin.com/in/robert-jastrz%C4%99bski-30a9a371/',
    avatar: AvatarRobert,
  },
  {
    name: 'Marcin Wiśniewski',
    email: 'mwisniewski@***REMOVED***.pl',
    phone: 'tel.: +48 509 612 945',
    description:
      'Doradztwo techniczne i handlowe, plotery, kopiarki, drukarki, niszczarki, sprzedaż i wynajem urządzeń',
    link: 'https://www.linkedin.com/in/marcin-wi%C5%9Bniewski1/',
    avatar: AvatarMarcin,
  },
  {
    name: 'Arkadiusz Wiśniewski',
    email: 'arkadiusz@***REMOVED***.pl',
    phone: 'tel.: +48 795 581 936',
    description:
      'Obsługa umów dzierżaw/wynajmu, papiery, media do ploterów, materiały eksploatacyjne, plotery, wynajem urządzeń',
    link: 'https://www.linkedin.com/in/arkadiusz-wi%C5%9Bniewski-3a06b6131/',
    avatar: AvatarArkadiusz,
  },
]

const servicePersons: PersonCardProps[] = [
  {
    name: 'Jacek Frąszczak',
    email: 'serwis@***REMOVED***.pl',
    phone: 'tel.: +48 602 527 397',
    description: 'Zarządzanie serwisem, obsługa zleceń serwisowych',
  },
]

const contacts: InfoCardProps[] = [
  { name: 'Biuro', email: 'biuro@***REMOVED***.pl', phones: ['tel.: +48 604 858 045'] },
  {
    name: 'Serwis',
    email: 'serwis@***REMOVED***.pl',
    phones: ['tel.: +48 61 842-53-00 w.106', 'tel. kom. 604 858 045'],
  },
  {
    name: 'SIECI TELEINFORMATYCZNE',
    email: 'teleinfo@***REMOVED***.pl',
    phones: ['tel. kom. 601 777 319'],
  },
]
</script>

<style lang="scss" scoped>
.contact {
  @include flex-column;
  gap: 22px;

  &__header {
    margin-bottom: 10px;
    @include flex-column;
    gap: 8px;
    padding: 16px;
    border-radius: 4px;
    background-color: $gray-color-300;
  }

  &__title {
    text-align: left;

    @media ($max-viewport-9) {
      font-size: rem(20);
    }
  }

  &__info {
    @include flex-row;
    gap: 10px;

    @media ($max-viewport-9) {
      flex-direction: column;
    }
  }

  &__subtitle {
    margin-bottom: 12px;

    text-align: left;
    font-size: rem(20);
  }

  &__persons {
    display: grid;

    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    column-gap: 12px;

    @media ($max-viewport-9) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
