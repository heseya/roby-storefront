<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <div class="about-page">
      <BaseContainer class="about-page__content about-page__content--narrow">
        <LayoutHeader variant="black" tag="h1" class="about-page__title">
          {{ aboutPage?.title }}
        </LayoutHeader>
        <AboutDescription
          v-if="aboutPage"
          :text="aboutPage?.text"
          :point1="aboutPage?.point_1"
          :point2="aboutPage?.point_2"
          :image-url="mainImageUrl"
        />
      </BaseContainer>

      <AboutBanner
        v-if="aboutPage?.catching_text"
        class="about-page__banner"
        :text="aboutPage?.catching_text"
      />

      <BaseContainer v-if="aboutPage" class="about-page__content">
        <AboutTeam :title="aboutPage?.persons_title" />
        <AboutPartnerCarousel :title="aboutPage?.slider_title" />
      </BaseContainer>

      <AboutImageBanner
        v-if="aboutPage"
        :title="aboutPage?.banner_title"
        :text="aboutPage?.banner_text"
        :image-url="bannerImageUrl"
      />
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "O nas"
  }
}
</i18n>

<script setup lang="ts">
import { TranslatedAboutPage } from '~/interfaces/aboutPage'

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

useSeoMeta({
  title: t('title'),
})

const { data: aboutPage } = useAsyncData('about-page', async () => {
  try {
    const directus = useDirectus()
    const data = await directus.items('AboutPage').readOne(1, {
      // @ts-ignore directus typing is wrong
      fields: ['translations.*', 'translations.main_image.*', 'translations.banner_image.*'],
    })
    return getTranslated(data!.translations!, 'pl-PL') as TranslatedAboutPage
  } catch {
    showError({ message: t('errors.NOT_FOUND'), statusCode: 404 })
  }
})

const mainImageUrl = computed(() => getImageUrl(aboutPage.value?.main_image, { width: 600 }))
const bannerImageUrl = computed(() => getImageUrl(aboutPage.value?.banner_image, { width: 1200 }))
</script>

<style lang="scss" scoped>
.about-page {
  &__title {
    text-align: left;
    font-size: rem(45);

    @media ($max-viewport-9) {
      font-size: rem(25);
    }
  }

  &__content {
    @include flex-column;
    gap: 80px;

    @media ($max-viewport-9) {
      gap: 40px;
    }
    &--narrow {
      gap: 30px;

      @media ($max-viewport-9) {
        gap: 14px;
      }
    }
  }

  &__banner {
    margin: 80px 0;

    @media ($max-viewport-9) {
      margin: 40px 0;
    }
  }
}
</style>
