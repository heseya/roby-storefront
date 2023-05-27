<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <div class="rent-page">
      <BaseContainer class="rent-page__content">
        <LayoutHeader variant="black" tag="h1" class="rent-page__title">
          {{ rentPage?.title }}
        </LayoutHeader>
      </BaseContainer>
      <BaseContainer class="rent-page__content">
        <RentSteps :banner="stepsImageUrl" @scroll="handleScroll" />
        <RentAdvantages v-if="rentPage" :title="rentPage?.advantages_title" />
      </BaseContainer>
      <RentBanner
        v-if="rentPage"
        class="rent-page__banner"
        :title="rentPage?.banner_title"
        :subtitle="rentPage.banner_subtitle"
        :text="rentPage.banner_text"
        :image-url="bannerImageUrl"
      />
      <BaseContainer class="rent-page__content">
        <RentWhyOtherChose
          v-if="rentPage"
          :title="rentPage?.decision_title"
          :description="rentPage.decision_description"
        />
        <div ref="scrollTarget">
          <RentFillForm />
        </div>
        <RentFaq v-if="rentPage" :title1="rentPage?.faq_title_1" :title2="rentPage?.faq_title_2" />
      </BaseContainer>
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Wynajem drukarek i kopiarek"
  }
}
</i18n>

<script setup lang="ts">
import { TranslatedRentPage } from '~/interfaces/rentPage'

const t = useLocalI18n()

useSeoMeta({
  title: () => t('title'),
})

const breadcrumbs = computed(() => {
  const route = useRoute()
  return [
    {
      label: t('title'),
      link: route.path,
    },
  ]
})

const scrollTarget = ref<HTMLElement>()

const handleScroll = () => {
  scrollTarget.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const { data: rentPage } = useAsyncData('rent-page', async () => {
  try {
    const directus = useDirectus()
    const data = await directus.items('RentPage').readOne(1, {
      // @ts-ignore directus typing is wrong
      fields: ['translations.*', 'translations.banner_image.*', 'translations.steps_image.*'],
    })
    return getTranslated(data!.translations!, 'pl-PL') as TranslatedRentPage
  } catch {
    showError({ message: t('errors.NOT_FOUND'), statusCode: 404 })
  }
})

const stepsImageUrl = computed(() => getImageUrl(rentPage.value?.steps_image, { width: 650 }))
const bannerImageUrl = computed(() => getImageUrl(rentPage.value?.banner_image, { width: 1478 }))
</script>

<style lang="scss" scoped>
.rent-page {
  &__title {
    text-align: left;
    margin-bottom: 30px;
    font-size: rem(45);

    @media ($max-viewport-9) {
      font-size: rem(25);
    }
  }

  &__content {
    @include flex-column;
    gap: 80px;
  }

  &__banner {
    margin: 80px 0;
  }
}
</style>
