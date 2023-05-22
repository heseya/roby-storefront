<template>
  <form class="billing-form" @submit.prevent="onSave">
    <h2 class="billing-form__title">{{ t('billingAddress.formTitle') }}</h2>
    <AddressForm v-model:address="form.address" :invoice="form.invoice" />

    <FormCheckbox v-model="form.invoice" name="invoice">
      {{ $t('form.needInvoice') }}
    </FormCheckbox>

    <div class="billing-form__btns">
      <LayoutButton variant="white" html-type="button" @click="cancel">
        {{ $t('custom.cancel') }}
      </LayoutButton>
      <LayoutButton html-type="submit"> {{ $t('common.save') }} </LayoutButton>
    </div>
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "billingAddress": {
      "formTitle": "Wprowadź dane do rachunku"
    }
  }
}
</i18n>

<script setup lang="ts">
// TODO: maybe this component will be unnecessary? For now it's not used anywhere
import { useForm } from 'vee-validate'

import { AddressDto } from '@heseya/store-core'
import { EMPTY_ADDRESS } from '~/consts/address'

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', data: { address: AddressDto; invoice: boolean }): void
}>()

const props = defineProps<{
  address: AddressDto
  invoice: boolean
}>()

const t = useLocalI18n()
const $t = useGlobalI18n()

const { handleSubmit } = useForm()
const form = reactive({
  address: { ...EMPTY_ADDRESS } as AddressDto,
  invoice: false,
})

watch(
  () => [props.address, props.invoice],
  () => {
    form.address = { ...EMPTY_ADDRESS, ...(props.address || {}) }
    form.invoice = props.invoice
  },
  { immediate: true },
)

const cancel = () => emit('cancel')

const onSave = handleSubmit(() => {
  if (!form.invoice) form.address.vat = undefined
  emit('submit', form)
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
