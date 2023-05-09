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
    </BaseContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { InfoCardProps } from '~/components/contact/InfoCard.vue'

const breadcrumb = [
  {
    label: 'Kontakt',
    link: '/kontakt',
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
}
</style>
