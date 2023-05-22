<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <div class="about-page">
      <BaseContainer class="about-page__content about-page__content--narrow">
        <LayoutHeader variant="black" tag="h1" class="about-page__title">
          Dowiedz się więcej o naszym zespole
        </LayoutHeader>
        <AboutDescription />
      </BaseContainer>

      <AboutBanner class="about-page__banner" />
      <BaseContainer class="about-page__content">
        <AboutTeam />
        <AboutPartnerCarousel />
      </BaseContainer>

      <AboutImageBanner />
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
const t = useLocalI18n()

const breadcrumbs = [
  {
    label: t('title'),
    link: '/o-nas',
  },
]

useSeoMeta({
  title: t('title'),
})
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
