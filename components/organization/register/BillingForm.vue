<template>
  <form class="billing-form" @submit.prevent="onSubmit">
    <FormInput
      v-model="form.values.billing_email"
      name="email"
      :label="t('invoice_email')"
      rules="required|email"
      autocomplete="email"
    />
    <br />
    <AddressForm v-model:address="form.values.billing_address" invoice vertical />

    <LayoutButton html-type="submit" class="billing-form__btn" :label="$t('common.continue')" />
    <LayoutButton
      variant="gray"
      size="small"
      class="billing-form__btn"
      :label="$t('common.back')"
      @emit="emit('back')"
    />
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "invoice_email": "Email na który wysyłane będą faktury"
  },
  "en": {
    "invoice_email": "Invoice email"
  }
}
</i18n>

<script setup lang="ts">
import type { OrganizationRegisterDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

import { EMPTY_ADDRESS } from '@/consts/address'

const props = withDefaults(
  defineProps<{
    initialValue?: OrganizationRegisterDto
  }>(),
  {
    initialValue: undefined,
  },
)

type BillingForm = Pick<OrganizationRegisterDto, 'billing_email' | 'billing_address'>

const t = useLocalI18n()

const form = useForm<BillingForm>({
  initialValues: {
    billing_email: props.initialValue?.billing_email || '',
    billing_address: props.initialValue?.billing_address || {
      ...EMPTY_ADDRESS,
    },
  },
})

const emit = defineEmits<{
  (event: 'submit', value: BillingForm): void
  (event: 'back'): void
}>()

const onSubmit = form.handleSubmit(() => {
  emit('submit', form.values)
})
</script>

<style lang="scss" scoped>
.billing-form {
  &__btn {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
