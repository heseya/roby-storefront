<template>
  <div class="checkout-container">
    <div class="checkout-container__icon">
      <ShoppingBag />
    </div>
    <div class="checkout-container__header">{{ t('container.header') }}</div>
    <div class="checkout-container__text">{{ t('container.text') }}</div>
    <div class="checkout-container__btn">
      <nuxt-link to="/">
        <LayoutButton>{{ t('container.btn') }}</LayoutButton></nuxt-link
      >
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "container": {
      "header": "Dziękujemy za zakupy!",
      "text": "Na Twojego maila zostanie wysłane potwierdzenie zakupu.",
      "btn": "Przejdź na stronę główną"
    }
  }
}
</i18n>

<script setup lang="ts">
import ShoppingBag from '@/assets/icons/shopping-bag.svg?component'
definePageMeta({
  layout: 'buying-progress',
})

const t = useLocalI18n()
</script>

<style lang="scss" scoped>
.checkout-container {
  display: grid;
  gap: 20px;
  width: 50%;
  background-color: #ffffff;

  &__icon {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__header,
  &__text {
    text-align: center;
  }

  &__header {
    font-weight: 800;
    font-size: 26px;
  }

  &__text {
    font-size: 14px;
  }

  &__btn {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }

  &__btn .btn {
    padding: 8px 55px;
  }
}
</style>
