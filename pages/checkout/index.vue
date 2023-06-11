<template>
  <NuxtLayout name="checkout">
    <BaseContainer class="checkout-page">
      <section class="checkout-page__section">
        <div class="checkout-page__area">
          <h2 class="checkout-page__title">{{ $t('account.myData') }}</h2>
          <ClientOnly>
            <CheckoutPersonalData />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 80px"></div>
            </template>
          </ClientOnly>
        </div>
        <div class="checkout-page__area">
          <h2 class="checkout-page__title">{{ $t('orders.delivery') }}</h2>
          <ClientOnly>
            <CheckoutShippingMethods />

            <template #placeholder>
              <div class="checkout-page__placeholder" style="height: 150px"></div>
            </template>
          </ClientOnly>
        </div>
        <div class="checkout-page__area">
          <h2 class="checkout-page__title">{{ $t('payments.billingAddress') }}</h2>
          <ClientOnly>
            <CheckoutFormLoggedBillingAddress v-if="defaultBillingAddress" />
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
    "createAccount": "Załóż konto",
    "payment": "Metoda płatności"
  },
  "en": {
    "title": "Order summary",
    "createAccount": "Create account",
    "payment": "Payment method"
  }
}
</i18n>

<script setup lang="ts">
import clone from 'lodash/clone'
import { EMPTY_ADDRESS } from '~/consts/address'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const $t = useGlobalI18n()

const checkout = useCheckoutStore()
const user = useUser()
const { defaultAddress: defaultBillingAddress } = useUserBillingAddresses()

// Autofill billing address if user is logged in
watch(
  () => defaultBillingAddress,
  () => {
    if (defaultBillingAddress.value)
      checkout.billingAddress = clone(defaultBillingAddress.value.address)
    else checkout.billingAddress = clone(EMPTY_ADDRESS)
  },
  { immediate: true },
)

// Autofill email if user is logged in
watch(
  () => user,
  () => {
    if (user.value) checkout.email = user.value.email
    else checkout.email = ''
  },
  { immediate: true },
)

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
