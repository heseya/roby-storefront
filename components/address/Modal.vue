<template>
  <FormModal
    @submit="onSubmit"
    v-model:open="isModalVisible"
    :form="form"
    :header="header"
    :error="error"
    :ok-text="saveButtonText || t('save')"
  >
    <FormInput
      rules="required"
      v-model:model-value="form.values.name"
      :label="t('form.name')"
      name="name"
      :disabled="disabled"
    />
    <CheckoutFormAddress
      :invoice="invoice"
      :address="form.values.address"
      @update:address="(value) => (form.values.address = value)"
      :disabled="disabled"
    />

    <FormCheckbox v-if="!disabled" v-model="invoice" name="invoice" :label="t('invoice')" />

    <FormCheckbox
      v-if="!disabled"
      v-model="form.values.default"
      name="default"
      :label="t('default')"
    />

    <slot></slot>
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "save": "Zapisz",
    "default": "Ustaw jako domyślny",
    "form": {
      "name": "Nazwa"
    },
    "invoice": "Chce otrzymać fakture VAT"
  }
}
</i18n>

<script setup lang="ts">
import { FormContext } from 'vee-validate'
import { UserSavedAddress, UserSavedAddressCreateDto } from '@heseya/store-core'
const t = useLocalI18n()

const error = ref<Error | null>(null)

const invoice = ref<boolean>(false)

const props = defineProps<{
  open: boolean
  type: 'billing' | 'shipping'
  form: FormContext<UserSavedAddressCreateDto> | FormContext<UserSavedAddress>
  disabled?: boolean
  saveButtonText?: string
  header: string
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'update:submit', value: UserSavedAddress | UserSavedAddressCreateDto): void
}>()

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

const onSubmit = props.form.handleSubmit(async (value) => emit('update:submit', value))

onBeforeMount(() => invoice ?? props.form.values.address.vat)
</script>
