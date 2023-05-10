<template>
  <NuxtLayout name="checkout">
    <BaseContainer class="checkout-page">
      <section class="checkout-page__section">
        <div class="checkout-page__area">
          <h2 class="checkout-page__title">{{ t('personalData') }}</h2>
          <ClientOnly>
            <CheckoutPersonalData />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 80px"></div>
            </template>
          </ClientOnly>
        </div>
        <div class="checkout-page__area">
          <h2 class="checkout-page__title">{{ t('shipping') }}</h2>
          <ClientOnly>
            <CheckoutShippingMethods />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 150px"></div>
            </template>
          </ClientOnly>
        </div>
        <div class="checkout-page__area">
          <h2 class="checkout-page__title">{{ t('billing') }}</h2>
          <ClientOnly>
            <CheckoutFormLoggedBillingAddress v-if="hasBillingAddresses" />
            <CheckoutBillingAddress v-else />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 80px"></div>
            </template>
          </ClientOnly>
        </div>
        <div class="checkout-page__area">
          <h2 class="checkout-page__title">{{ t('payment') }}</h2>
          <ClientOnly>
            <CheckoutPaymentMethods />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 100px"></div>
            </template>
          </ClientOnly>
        </div>
        <div class="checkout-page__area">
          <ClientOnly>
            <CheckoutComment />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 80px"></div>
            </template>
          </ClientOnly>
        </div>
      </section>
      <section class="checkout-page__section">
        <div class="checkout-page__area">
          <ClientOnly>
            <CheckoutSummary />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 300px"></div>
            </template>
          </ClientOnly>
        </div>
      </section>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Podsumowanie zamówienia",
    "personalData": "Moje dane",
    "createAccount": "Załóż konto",
    "shipping": "Dostawa",
    "billing": "Dane do rachunku",
    "payment": "Metoda płatności"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const hasBillingAddresses = computed(() => {
  const { addresses } = useUserBillingAddresses()
  return addresses.value.length > 0
})

useSeoMeta({
  title: () => t('title'),
})

useHead({
  // Import of Inpost map widget
  link: [{ rel: 'stylesheet', href: 'https://geowidget.easypack24.net/css/easypack.css' }],
  script: [{ src: 'https://geowidget.easypack24.net/js/sdk-for-javascript.js', async: true }],
})
</script>

<style lang="scss" scoped>
.checkout-page {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media ($viewport-10) {
    grid-template-columns: 1fr 360px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__area {
    padding: 16px;
    background-color: #fff;
    position: relative;
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

  &__placeholder {
    width: 100%;
    height: 80px;
  }
}
</style>
