<template>
  <form class="checkout-register-form">
    <FormInput
      v-model="form.values.name"
      :label="$t('form.name')"
      name="checkoutName"
      rules="alpha"
    />
    <FormInput
      v-model:model-value="form.values.surname"
      :label="$t('form.surname')"
      name="checkoutSurname"
      rules="alpha"
    />
    <FormInputPassword
      v-model:model-value="form.values.password"
      :label="$t('form.password')"
      name="checkoutPassword"
    />
    <FormInputPassword
      v-model:model-value="form.values.confirmPassword"
      :label="$t('form.confirmPassword')"
      name="checkout-confirmPassword1"
      rules="confirmedPassword:@checkoutPassword"
    />
  </form>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'
import { useForm } from 'vee-validate'

const $t = useGlobalI18n()
const checkout = useCheckoutStore()

const form = useForm({
  initialValues: {
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
  },
})
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
