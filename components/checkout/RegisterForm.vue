<template>
  <form class="checkout-register-form">
    <FormInput
      v-model="form.values.name"
      :label="$t('form.name')"
      name="name"
      rules="alpha|required"
    />
    <FormInput
      v-model="form.values.surname"
      :label="$t('form.surname')"
      name="surname"
      rules="alpha|required"
    />
    <FormInputPassword
      v-model="form.values.password"
      :label="$t('form.password')"
      name="password"
      rules="password|required"
    />
    <FormInputPassword
      v-model="form.values.confirmPassword"
      :label="$t('form.confirmPassword')"
      name="confirmPassword"
      rules="confirmedPassword:@password|required"
    />
  </form>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'
import { useForm } from 'vee-validate'

interface BasicUserData {
  name: string
  surname: string
  password: string
  confirmPassword: string
}

const props = defineProps<{
  userData: BasicUserData
}>()

const form = useForm<BasicUserData>()

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
