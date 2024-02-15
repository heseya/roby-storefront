<template>
  <div class="shop-off">
    <img
      class="shop-off__logo"
      :src="config.storeLogoUrl"
      :alt="config.storeName"
      loading="eager"
    />
    <LayoutHeader class="shop-off__title" variant="black"> {{ t('title') }} </LayoutHeader>
    <span class="shop-off__text"> {{ t('text') }} </span>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Sklep jest tymczasowo niedostępny",
    "text": "Pracujemy nad aktualizacją sklepu. To nie potrwa długo, zapraszamy wkrótce."
  },
  "en": {
    "title": "The shop is temporarily unavailable",
    "text": "We are working on updating the store. It won't be long, come back soon."
  }
}
</i18n>

<script lang="ts" setup>
import { useConfigStore } from '@/store/config'

const t = useLocalI18n()
const config = useConfigStore()
</script>

<style lang="scss" scoped>
.shop-off {
  height: 100vh;
  width: 100%;

  @include flex-column;
  align-items: center;
  justify-content: center;
  gap: 14px;

  &__logo {
    width: 160px;
  }

  &__title {
    font-size: rem(20);

    @media ($viewport-9) {
      font-size: rem(30);
    }
  }

  &__text {
    text-align: center;

    @media ($viewport-9) {
      font-size: rem(16);
    }
  }
}
</style>
