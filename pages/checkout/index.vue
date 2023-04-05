<template>
  <BaseContainer class="checkout-page">
    <section class="checkout-page__section">
      <div class="checkout-page__area">
        <h2 class="checkout-page__title checkout-page__title--slim">{{ t('personalData') }}</h2>
        <hr class="hr hr--light" />
        <h2 class="checkout-page__title checkout-page__title--slim">{{ t('createAccount') }}</h2>
      </div>
      <div class="checkout-page__area">
        <h2 class="checkout-page__title">{{ t('shipping') }}</h2>
        <CheckoutShippingMethods />
      </div>
      <div class="checkout-page__area">
        <h2 class="checkout-page__title">{{ t('billing') }}</h2>
        <CheckoutBillingAddress />
      </div>
      <div class="checkout-page__area">
        <h2 class="checkout-page__title">{{ t('payment') }}</h2>
        <CheckoutPaymentMethods />
      </div>
      <div class="checkout-page__area">
        <CheckoutComment />
      </div>
    </section>
    <section class="checkout-page__section">
      <div class="checkout-page__area">
        <CheckoutSummary />
      </div>
    </section>
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "personalData": "Moje dane",
    "createAccount": "Załóż konto",
    "shipping": "Dostawa",
    "billing": "Dane do rachunku",
    "payment": "Metoda płatności"
  }
}
</i18n>

<script setup lang="ts">
definePageMeta({
  layout: 'checkout',
})

const t = useLocalI18n()
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
    margin-bottom: 16px;

    &--slim {
      font-weight: 400;
    }
  }
}
</style>
