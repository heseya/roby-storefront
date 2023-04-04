<template>
  <BaseContainer class="checkout-page">
    <section class="checkout-page__section">
      <div class="checkout-page__area">
        <h2 class="checkout-page__title checkout-page__title--slim">Moje dane</h2>
        <hr class="hr hr--light" />
        <h2 class="checkout-page__title checkout-page__title--slim">Załóż konto</h2>
      </div>
      <div class="checkout-page__area">
        <h2 class="checkout-page__title">Dostawa</h2>
      </div>
      <div class="checkout-page__area">
        <h2 class="checkout-page__title">Dane do rachunku</h2>
      </div>
      <div class="checkout-page__area">
        <h2 class="checkout-page__title">Metoda płatności</h2>
      </div>
      <div class="checkout-page__area">
        <h6>Uwagi do zamówienia</h6>
      </div>
    </section>
    <section class="checkout-page__section">
      <div class="checkout-page__area"></div>
    </section>
  </BaseContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'checkout',
})
</script>

<style lang="scss" scoped>
.checkout-page {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 18px;

  &__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__area {
    padding: 16px;
    background-color: #fff;
  }

  &__title {
    font-size: rem(18);
    font-weight: 600;
    margin-top: 0;

    &--slim {
      font-weight: 400;
    }
  }
}
</style>
