<template>
  <form class="checkout-register-form">
    <FormInput
      v-model="checkout.personalData.name"
      :label="$t('form.name')"
      autocomplete="name"
      name="checkout_name"
      rules="alpha|required"
    />
    <FormInput
      v-model="checkout.personalData.surname"
      :label="$t('form.surname')"
      autocomplete="surname"
      name="checkout_surname"
      rules="alpha|required"
    />
    <FormInputPassword
      v-model="checkout.personalData.password"
      :label="$t('form.password')"
      autocomplete="password"
      name="checkout_password"
      rules="password|required"
    />
    <FormInputPassword
      v-model="checkout.personalData.confirmPassword"
      :label="$t('form.confirmPassword')"
      autocomplete="confirmPassword"
      name="checkout_confirmPassword"
      rules="confirmedPassword:@checkout_password|required"
    />

    <AccountConsentsList v-model:value="checkout.personalData.consents" />
  </form>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'

const $t = useGlobalI18n()
const checkout = useCheckoutStore()
</script>

<style lang="scss" scoped>
.checkout-register-form {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 26px;

  @media ($viewport-6) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
