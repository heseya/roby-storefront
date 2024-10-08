<template>
  <CheckoutPageArea :title="$t('payments.billingAddress')">
    <LayoutButton
      v-show="canCopyFromShippingAddress"
      variant="gray"
      class="billing-address-btn"
      @click="copyFromShippingAddress"
    >
      {{ t('billingAddress.copy') }}
    </LayoutButton>

    <div class="checkout-billing-address">
      <FormCheckbox v-model="checkout.invoiceRequested" name="is_invoice" style="margin-top: 16px">
        {{ $t('form.needInvoice') }}
      </FormCheckbox>
      <AddressForm
        v-model:address="checkout.billingAddress"
        :invoice="checkout.invoiceRequested ?? false"
        name-prefix="billing_address"
        type="billing"
      />
    </div>
  </CheckoutPageArea>
</template>

<i18n lang="json">
{
  "pl": {
    "billingAddress": {
      "copy": "Skopiuj z adresu dostawy"
    }
  },
  "en": {
    "billingAddress": {
      "copy": "Copy from delivery address"
    }
  }
}
</i18n>

<script setup lang="ts">
import { ShippingType } from '@heseya/store-core'
import { useCheckoutStore } from '~/store/checkout'
import { useConfigStore } from '~/store/config'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const config = useConfigStore()

const canCopyFromShippingAddress = computed(
  () => checkout.shippingMethod?.shipping_type === ShippingType.Address,
)

const copyFromShippingAddress = () => {
  checkout.billingAddress = {
    ...checkout.shippingAddress,
    /**
     * If client requests invoice, it is safer to not copy the name from shipping address to force client to enter it manually
     */
    name: checkout.invoiceRequested ? checkout.billingAddress.name : checkout.shippingAddress.name,
  }
}

onMounted(() => {
  checkout.invoiceRequested =
    checkout.invoiceRequested || config.env.select_invoice_by_default === '1'
})
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
