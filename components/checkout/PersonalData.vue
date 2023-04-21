<template>
  <div class="checkout-personal-data">
    <FormInput
      v-model="checkout.email"
      :label="t('email.label')"
      name="email"
      rules="email|required"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "email": {
      "label": "Adres e-mail"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()
</script>

<style lang="scss" scoped>
.checkout-personal-data {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  @media ($viewport-6) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
