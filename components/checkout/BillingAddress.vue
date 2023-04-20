<template>
  <div class="checkout-billing-address">
    <CheckoutSelectedAddress
      :address="checkout.billingAddress"
      :empty-text="t('billingAddress.sameAsDelivery')"
      @edit="isModalOpen = true"
    />

    <FormCheckbox
      :model-value="checkout.invoiceRequested"
      name="fvat"
      style="margin-top: 16px"
      disabled
    >
      {{ t('billingAddress.invoice') }}
    </FormCheckbox>

    <LayoutModal v-model:open="isModalOpen">
      <CheckoutFormBillingAddress v-if="isModalOpen" @close="isModalOpen = false" />
    </LayoutModal>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "billingAddress": {
      "sameAsDelivery": "Takie same jak dane do wysyłki.",
      "invoice": "Potrzebuje fakturę VAT"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()

const isModalOpen = ref(false)
</script>
