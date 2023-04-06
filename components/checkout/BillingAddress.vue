<template>
  <div class="checkout-billing-address">
    <p>{{ t('billingAddress.sameAsDelivery') }}</p>
    <FormCheckbox v-model="isInvoice" name="fvat" style="margin-top: 16px">
      {{ t('billingAddress.invoice') }}
    </FormCheckbox>
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
const t = useLocalI18n()
const isInvoice = ref(false)
</script>

<style lang="scss" scoped></style>
