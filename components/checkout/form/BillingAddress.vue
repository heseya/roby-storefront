<template>
  <form class="billing-form" @submit.prevent="onSave">
    <h2 class="billing-form__title">{{ t('billingAddress.formTitle') }}</h2>
    <CheckoutFormAddress v-model:address="form.address" :invoice="form.invoice" />
    <FormCheckbox v-model="form.invoice" name="invoice">
      {{ t('billingAddress.invoice') }}
    </FormCheckbox>

    <div class="billing-form__btns">
      <LayoutButton variant="white" html-type="button" @click="close">
        {{ t('cancel') }}
      </LayoutButton>
      <LayoutButton html-type="submit"> {{ t('save') }} </LayoutButton>
    </div>
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "billingAddress": {
      "formTitle": "Wprowadź dane do rachunku",
      "invoice": "Potrzebuje fakturę VAT",
      "save": "Zapisz",
      "cancel": "Anuluj"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

import { AddressDto } from '@heseya/store-core'
import { useCheckoutStore } from '@/store/checkout'
import { EMPTY_ADDRESS } from '~/consts/address'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const t = useLocalI18n()
const checkout = useCheckoutStore()

const { handleSubmit } = useForm()
const form = reactive({
  address: { ...EMPTY_ADDRESS } as AddressDto,
  invoice: false,
})

watch(
  () => checkout.billingAddress,
  () => {
    form.address = { ...EMPTY_ADDRESS, ...(checkout.billingAddress || {}) }
    form.invoice = checkout.invoiceRequested
  },
  { immediate: true },
)

const close = () => emit('close')

const onSave = handleSubmit(() => {
  if (!form.invoice) form.address.vat = undefined
  checkout.billingAddress = form.address
  checkout.invoiceRequested = form.invoice
  close()
})
</script>

<style lang="scss" scoped>
.billing-form {
  padding: 16px;

  &__btns {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style>
