<template>
  <div class="rent-page">
    <BaseContainer class="rent-page__content">
      <div>
        <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumb" />
        <LayoutHeader variant="black" tag="h1" class="rent-page__title">
          {{ t('title') }}
        </LayoutHeader>
      </div>
    </BaseContainer>
    <BaseContainer class="rent-page__content">
      <RentSteps />
      <RentAdvantages />
    </BaseContainer>
    <RentBanner class="rent-page__banner" />
    <BaseContainer class="rent-page__content">
      <RentWhyOtherChose />
      <RentFillForm />
      <RentFaq />
    </BaseContainer>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Wynajem drukarek i kopiarek"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

useHead({
  title: t('title'),
})

const breadcrumb = [
  {
    label: 'Wynajem',
    link: '/wynajem',
  },
]
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
