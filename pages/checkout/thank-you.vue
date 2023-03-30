<template>
  <div class="checkout-container">
    <div class="checkout-container__icon">
      <ShoppingBag />
    </div>
    <div class="checkout-container__header">Dziękujemy za zakupy!</div>
    <div class="checkout-container__text">
      Na Twojego maila zostanie wysłane potwierdzenie zakupu.
    </div>
    <div class="checkout-container__btn">
      <LayoutButton>Przejdź na stronę główną</LayoutButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShoppingBag from '@/assets/icons/shopping-bag.svg?component'
definePageMeta({
  layout: 'buying-progress',
})
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
