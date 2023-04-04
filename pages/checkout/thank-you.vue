<template>
  <div class="checkout-container">
    <div class="checkout-container__icon">
      <ShoppingBag />
    </div>
    <div class="checkout-container__header">{{ t('container.header') }}</div>
    <div class="checkout-container__text">
      {{ t('container.text') }}
      <b
        ><u>{{ t('container.my-account') }}</u></b
      >
    </div>
    <div class="checkout-container__nav">
      <NuxtLink to="/">
        <LayoutButton class="checkout-container__btn"> {{ t('container.btn') }}</LayoutButton>
      </NuxtLink>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "container": {
      "header": "Dziękujemy za zakupy!",
      "text": "Na Twojego maila zostanie wysłane potwierdzenie zakupu. Szczegóły zamówienia znajdziesz również w  ",
      "my-account": "Moje konto",
      "btn": "Sprawdź szczegóły zamówienia"
    }
  }
}
</i18n>

<script setup lang="ts">
import ShoppingBag from '@/assets/icons/shopping-bag.svg?component'
definePageMeta({
  layout: 'checkout',
})

const t = useLocalI18n()
</script>

<style lang="scss" scoped>
.checkout-container {
  display: grid;
  align-content: center;
  gap: 30px;
  padding: 10px;
  background-color: $white-color;
  width: 90%;

  @media ($viewport-7) {
    width: 80%;
    gap: 20px;
    align-content: flex-start;
  }

  @media ($viewport-13) {
    width: 41%;
  }

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
    font-size: 25px;
    line-height: 2rem;
  }

  &__text {
    font-size: 12px;
  }

  &__nav {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }

  &__btn {
    padding: 10px 55px;
  }
}
</style>