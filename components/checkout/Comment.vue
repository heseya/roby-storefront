<template>
  <CheckoutPageArea>
    <div class="checkout-comment">
      <FormInput
        v-model="checkout.comment"
        :label="t('comment.label')"
        name="comment"
        :placeholder="t('comment.placeholder')"
      />
    </div>
  </CheckoutPageArea>
</template>

<i18n lang="json">
{
  "pl": {
    "comment": {
      "label": "Uwagi do zamówienia",
      "placeholder": "Uwagi do zamówienia np. Informacje o dostarczeniu przesyłki"
    }
  },
  "en": {
    "comment": {
      "label": "Comments to order",
      "placeholder": "Notes to the order, e.g. information about the delivery of the shipment"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()
</script>

<style lang="scss" scoped></style>
