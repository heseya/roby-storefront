<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <BaseContainer class="contact">
      <div>
        <div class="contact__header">
          <LayoutHeader class="contact__title" variant="black" tag="h1">
            {{ config.env.company_name }}
          </LayoutHeader>
          <div
            class="contact__subtitle"
            v-html="config.env.contact_page_text || config.env.company_address"
          ></div>
        </div>

        <div class="contact__info">
          <ContactInfoCard
            v-for="department in departments"
            :key="department.id"
            :data="department"
          />
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

      <div class="contact__form">
        <h2>{{ t('formTitle') }}</h2>
        <ProductPageContactForm type="contact" :action-text="t('actionText')" />
      </div>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Kontakt",
    "formTitle": "Formularz kontaktowy",
    "actionText": "Wyślij wiadomość"
  },
  "en": {
    "title": "Contact",
    "formTitle": "Contact form",
    "actionText": "Send message"
  }
}
</i18n>

<script setup lang="ts">
import groupBy from 'lodash/groupBy'
import { useConfigStore } from '@/store/config'
import type { ContactDepartment, ContactPerson } from '@/interfaces/contactPage'

const config = useConfigStore()
const t = useLocalI18n()

const breadcrumbs = computed(() => {
  const route = useRoute()
  return [
    {
      label: t('title'),
      link: route.path,
    },
  ]
})

useSeoTitle(t('title'))

const { data: departments } = useAsyncData('contact-departments', async () => {
  const directus = useDirectus()
  const { data } = await directus.items('Departments').readByQuery({
    fields: [
      'id',
      'email',
      'phone_mobile',
      'phone_stationery',
      'translations.name',
      'translations.text',
      'translations.languages_code',
    ],
  })
  return data as ContactDepartment[]
})

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
  return data as ContactPerson[]
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

  &__form {
    padding: 24px;
    border: solid 1px #efefef;
    border-radius: 4px;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
