<template>
  <LayoutButton
    v-show="canCopyFromShippingAddress"
    variant="gray"
    class="billing-address-btn"
    @click="copyFromShippingAddress"
  >
    {{ t('billingAddress.copy') }}
  </LayoutButton>

  <div class="checkout-billing-address">
    <CheckoutFormAddress
      v-model:address="checkout.billingAddress"
      :invoice="checkout.invoiceRequested"
    />
    <FormCheckbox v-model="checkout.invoiceRequested" name="is_invoice" style="margin-top: 16px">
      {{ t('billingAddress.invoice') }}
    </FormCheckbox>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "billingAddress": {
      "invoice": "Potrzebuje fakturę VAT",
      "copy": "Skopiuj z adresu dostawy"
    }
  }
}
</i18n>

<script setup lang="ts">
import { ShippingType } from '@heseya/store-core'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()

const canCopyFromShippingAddress = computed(
  () => checkout.shippingMethod?.shipping_type === ShippingType.Address,
)

const copyFromShippingAddress = () => {
  checkout.billingAddress = { ...checkout.shippingAddress }
}
</script>

<style lang="scss" scoped>
.billing-address-btn {
  width: 100%;
  margin-bottom: 16px;

  @media ($viewport-5) {
    position: absolute;
    right: 16px;
    top: 12px;
    width: auto;
  }
}
</style>
