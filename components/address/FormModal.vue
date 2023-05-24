<template>
  <FormModal
    v-model:open="isModalVisible"
    :values="form.values"
    :header="header"
    :error="errorMessage"
    :ok-text="$t('common.save')"
    :fullscreen="fullscreen"
    @submit="onSubmit"
  >
    <FormInput v-model="form.values.name" rules="required" :label="$t('common.name')" name="name" />
    <AddressForm v-model:address="form.values.address" :invoice="isInvoice" />

    <FormCheckbox v-model="isInvoice" name="invoice" :label="t('invoice')" />

    <FormCheckbox
      v-model="form.values.default"
      :disabled="props.address && props.address.default"
      name="default"
      :label="t('default')"
    />
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "default": "Ustaw jako domyślny",
    "invoice": "Chce otrzymać fakture VAT"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import {
  UserSavedAddress,
  UserSavedAddressCreateDto,
  UserSavedAddressUpdateDto,
} from '@heseya/store-core'
import { EMPTY_ADDRESS } from '~/consts/address'

const t = useLocalI18n()
const $t = useGlobalI18n()
const formatError = useErrorMessage()
const { notify } = useNotify()

const props = withDefaults(
  defineProps<{
    open: boolean
    type: 'billing' | 'shipping'
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

const errorMessage = ref<string>()

const isInvoice = ref<boolean>(!!props.address?.address.vat)

const form = useForm<UserSavedAddressCreateDto | UserSavedAddressUpdateDto>()

const onSubmit = async () => {
  const { success, error } = props.address
    ? await edit(props.address.id, form.values)
    : await add(form.values)

  if (!success) {
    errorMessage.value = formatError(error)
  } else {
    notify({
      title: props.successUpdateMessage,
      type: 'success',
    })

    isModalVisible.value = false
  }
}

watch(
  () => props.open,
  () => {
    if (props.open) {
      form.values = props.address ?? {
        default: false,
        name: '',
        address: { ...EMPTY_ADDRESS },
      }
    }
  },
)
</script>
