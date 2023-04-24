<template>
  <div class="rent-page">
    <BaseContainer class="rent-page__content">
      <LayoutHeader variant="black" tag="h1" class="rent-page__title">
        {{ t('title') }}
      </LayoutHeader>
    </BaseContainer>
    <BaseContainer class="rent-page__content">
      <RentSteps />
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
</script>

<style lang="scss" scoped>
.rent-page {
  &__title {
    text-align: left;
    margin-bottom: 30px;
    font-size: rem(45);
  }

  &__content {
    @include flex-column;
    gap: 80px;
  }
}
</style>
