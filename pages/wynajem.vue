<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <div class="rent-page">
      <BaseContainer class="rent-page__content">
        <div>
          <LayoutHeader variant="black" tag="h1" class="rent-page__title">
            {{ t('title') }}
          </LayoutHeader>
        </div>
      </BaseContainer>
      <BaseContainer class="rent-page__content">
        <RentSteps @scroll="handleScroll" />
        <RentAdvantages />
      </BaseContainer>
      <RentBanner class="rent-page__banner" />
      <BaseContainer class="rent-page__content">
        <RentWhyOtherChose />
        <div ref="scrollTarget">
          <RentFillForm />
        </div>
        <RentFaq />
      </BaseContainer>
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Wynajem drukarek i kopiarek"
  },
  "en": {
    "title": "Rental of printers and copiers"
  }
}
</i18n>

<script setup lang="ts">
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
