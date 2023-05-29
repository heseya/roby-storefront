<template>
  <NuxtLayout name="checkout">
    <BaseContainer class="checkout-page">
      <section class="checkout-page__section">
        <CheckoutPersonalData v-model:submit="create.submit" @create-order="create.value = true" />
        <CheckoutShippingMethods />

        <CheckoutFormLoggedBillingAddress v-if="defaultBillingAddress" />
        <CheckoutBillingAddress v-else />

        <CheckoutPaymentMethods />
        <CheckoutComment />
      </section>
      <section class="checkout-page__section">
        <CheckoutSummary :create="create.value" @create-order="create.submit = true" />
      </section>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Podsumowanie zamówienia",
    "payment": "Metoda płatności",
    "account": {
      "createQuestion": "Chce założyć konto",
      "create": "Załóż konto",
      "description": "Wystarczy, że wypełnisz poniższe pola, aby utworzyć konto w naszym sklepie."
    }
  }
}
</i18n>

<script setup lang="ts">
import clone from 'lodash/clone'
import { EMPTY_ADDRESS } from '~/consts/address'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()

const checkout = useCheckoutStore()
const user = useUser()
const { defaultAddress: defaultBillingAddress } = useUserBillingAddresses()

const create = reactive({
  submit: false,
  value: false,
})

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
}
</style>
