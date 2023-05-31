<template>
  <CheckoutPageArea>
    <div class="checkout-register-form">
      <FormInput
        :model-value="name"
        :label="$t('form.name')"
        autocomplete="name"
        name="name"
        rules="alpha|required"
        @update:model-value="emit('update:value', { key: 'name', value: $event as string })"
      />
      <FormInput
        :model-value="surname"
        :label="$t('form.surname')"
        autocomplete="surname"
        name="surname"
        rules="alpha|required"
        @update:model-value="emit('update:value', { key: 'surname', value: $event as string })"
      />
      <FormInputPassword
        :model-value="password"
        :label="$t('form.password')"
        autocomplete="new-password"
        name="password"
        @update:model-value="emit('update:value', { key: 'password', value: $event as string })"
      />
      <FormInputPassword
        :model-value="confirmPassword"
        :label="$t('form.confirmPassword')"
        autocomplete="confirmPassword"
        name="confirmPassword"
        rules="confirmedPassword:@password|required"
        @update:model-value="
          emit('update:value', { key: 'confirmPassword', value: $event as string })
        "
      />

      <AccountConsentsList
        :value="consents"
        @update:value="emit('update:consents', $event as UserConsentDto)"
      />
    </div>

    <slot></slot>
  </CheckoutPageArea>
</template>

<script setup lang="ts">
import { UserConsentDto } from '@heseya/store-core'
import { CreateUserForm } from '../auth/RegisterForm.vue'

defineProps<{
  name: string
  surname: string
  password: string
  confirmPassword: string
  consents: UserConsentDto
}>()

const emit = defineEmits<{
  (
    event: 'update:value',
    value: { key: keyof Omit<CreateUserForm, 'consents'>; value: string },
  ): void
  (event: 'update:consents', value: UserConsentDto): void
}>()
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
