<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <BaseContainer class="contact">
      <div>
        <div class="contact__header">
          <LayoutHeader class="contact__title" variant="black" tag="h1">
            {{ config.env.company_name }}
          </LayoutHeader>
          <span class="contact__subtitle">{{ config.env.company_address }}</span>
        </div>
        <div class="contact__info">
          <ContactInfoCard v-for="(data, index) in contacts" :key="index" :data="data" />
        </div>
      </div>

      <div v-for="[group, persons] in personGroups" :key="group">
        <LayoutHeader class="contact__group-name" variant="black" tag="h2">
          {{ group }}
        </LayoutHeader>
        <div class="contact__persons">
          <ContactPersonCard v-for="(person, index) in persons" :key="index" :person="person" />
        </div>
      </div>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Kontakt"
  }
}
</i18n>

<script setup lang="ts">
import groupBy from 'lodash/groupBy'
import { InfoCardProps } from '@/components/contact/InfoCard.vue'
import { useConfigStore } from '~/store/config'
import { Person } from '~/interfaces/Person'

const config = useConfigStore()
const t = useLocalI18n()

const breadcrumbs = [
  {
    label: t('title'),
    link: '/kontakt',
  },
]

useSeoMeta({
  title: t('title'),
})

// TODO: move to Directus
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

const { data: allPersons } = useAsyncData('contact-persons', async () => {
  const directus = useDirectus()
  const { data } = await directus.items('Person').readByQuery({
    fields: [
      'id',
      'name',
      'date_created',
      'email',
      'phone',
      // @ts-ignore files are not properly typed?
      'avatar.filename_disk',
      'part_of_team',
      'group',
      'linkedin_url',
      'translations.description',
      'translations.languages_code',
    ],
  })
  return data as Person[]
})

const personGroups = computed(() =>
  Object.entries(groupBy(allPersons.value, 'group')).filter(([group]) => group !== 'null'),
)
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
    text-transform: uppercase;

    @media ($max-viewport-9) {
      font-size: rem(20);
    }
  }

  &__subtitle {
    text-transform: uppercase;
  }

  &__info {
    @include flex-row;
    gap: 10px;

    @media ($max-viewport-9) {
      flex-direction: column;
    }
  }

  &__group-name {
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
