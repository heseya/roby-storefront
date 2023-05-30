<template>
  <CheckoutPageArea>
    <div class="checkout-register-form">
      <FormInput
        v-model="form.values.name"
        :label="$t('form.name')"
        autocomplete="name"
        name="name"
        rules="alpha|required"
      />
      <FormInput
        v-model="form.values.surname"
        :label="$t('form.surname')"
        autocomplete="surname"
        name="surname"
        rules="alpha|required"
      />
      <FormInputPassword
        v-model="form.values.password"
        :label="$t('form.password')"
        autocomplete="new-password"
        name="password"
      />
      <FormInputPassword
        v-model="form.values.confirmPassword"
        :label="$t('form.confirmPassword')"
        autocomplete="confirmPassword"
        name="confirmPassword"
        rules="confirmedPassword:@password|required"
      />
      <AccountConsentsList v-model:value="form.values.consents" />
    </div>
  </CheckoutPageArea>
</template>

<i18n lang="json">
{
  "pl": {
    "account": {
      "createQuestion": "Chce założyć konto",
      "create": "Załóż konto",
      "description": "Wystarczy, że wypełnisz poniższe pola, aby utworzyć konto w naszym sklepie."
    }
  }
}
</i18n>

<script setup lang="ts">
import { RegisterForm } from '../auth/RegisterForm.vue'

const props = defineProps<{
  values: RegisterForm
}>()

const emit = defineEmits<{
  (e: 'update:submit', value: boolean): void
  (e: 'createOrder'): void
}>()

const userData = computed({
  get: () => props.values,
  set: (value) => emit('update:open', value),
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
