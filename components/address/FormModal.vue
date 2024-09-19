<template>
  <FormModal
    v-model:open="isModalVisible"
    :values="formValues"
    :header="header"
    :error="requestError"
    :ok-text="$t('common.save')"
    :fullscreen="fullscreen"
    class="address-form-modal"
    @submit="onSubmit"
  >
    <FormInput
      v-model="formValues.name"
      rules="required"
      :label="$t('common.name')"
      name="address_name"
    />

    <AddressForm v-model:address="formValues.address" :invoice="isInvoice" :type="type" />

    <FormCheckbox
      v-if="type === addressTypeEnum.Billing"
      v-model="isInvoice"
      name="address_invoice"
      class="address-form-modal__checkbox"
      :label="t('invoice')"
    />

    <FormCheckbox
      v-model="formValues.default"
      :disabled="props.address && props.address.default"
      name="address_default"
      class="address-form-modal__checkbox"
      :label="t('default')"
    />
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "default": "Ustaw jako domyślny",
    "invoice": "Chcę otrzymać fakture VAT"
  },
  "en": {
    "default": "Set as default",
    "invoice": "I want to receive VAT invoice"
  }
}
</i18n>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import type {
  UserSavedAddress,
  UserSavedAddressCreateDto,
  UserSavedAddressUpdateDto,
} from '@heseya/store-core'
import { EMPTY_ADDRESS } from '~/consts/address'

// Without import, it assumes that it is recursive component
import FormModal from '~/components/form/Modal.vue'
import { AddressType } from '~/types/AddressType'

const t = useLocalI18n()
const $t = useGlobalI18n()
const { notify } = useNotify()

const props = withDefaults(
  defineProps<{
    open: boolean
    type: AddressType
    address?: UserSavedAddress
    successUpdateMessage: string
    header: string
    fullscreen?: boolean
  }>(),
  {
    fullscreen: true,
    address: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'update:submit', value: UserSavedAddress | UserSavedAddressCreateDto): void
}>()

const isModalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const { add, edit } = useUserAddreses(props.type)

const requestError = ref<any>()
const addressTypeEnum = AddressType
const isInvoice = ref<boolean>(!!props.address?.address.vat)

const formValues = ref<UserSavedAddressCreateDto | UserSavedAddressUpdateDto>({
  default: false,
  name: '',
  address: { ...EMPTY_ADDRESS },
})

const onSubmit = async () => {
  const { success, error } = props.address
    ? await edit(props.address.id, formValues.value)
    : await add(formValues.value)

  if (!success) {
    requestError.value = error
  } else {
    notify({
      title: props.successUpdateMessage,
      type: 'success',
    })

    isModalVisible.value = false
  }
}

watch(isInvoice, (value) => {
  if (!value) formValues.value.address.vat = ''
})

watch(
  () => props.open,
  () => {
    if (!props.open) return
    if (props.address) {
      formValues.value = cloneDeep(props.address)
    } else {
      formValues.value = {
        default: false,
        name: '',
        address: { ...EMPTY_ADDRESS },
      }
    }
  },
)
</script>

<style lang="scss" scoped>
.address-form-modal {
  &__checkbox {
    margin: 0;
  }
}
</style>
