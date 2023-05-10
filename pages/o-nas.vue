<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumb" />
    <div class="about-page">
      <BaseContainer class="about-page__content about-page__content--narrow">
        <LayoutHeader variant="black" tag="h1" class="about-page__title">
          Dowiedz się więcej o naszym zespole
        </LayoutHeader>
        <AboutDescription />
      </BaseContainer>

      <AboutBanner class="about-page__banner" />

      <RentBanner class="about-page__banner" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const breadcrumb = [
  {
    label: 'O nas',
    link: '/o-nas',
  },
]
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

    &--narrow {
      gap: 30px;
    }
  }

  &__banner {
    margin: 80px 0;
  }
}
</style>
