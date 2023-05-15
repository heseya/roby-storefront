<template>
  <FormModal
    v-model:open="isModalVisible"
    :form="form"
    :header="t(`${addressType}.${type}.header`)"
    :error="error"
    :ok-text="t('save')"
    @submit="onSubmit"
  >
    <FormInput
      v-model:model-value="form.values.name"
      rules="required"
      :label="t('form.name')"
      name="name"
    />
    <CheckoutFormAddress v-model:address="form.values.address" :invoice="isInvoice" />

    <FormCheckbox v-model="isInvoice" name="invoice" :label="t('invoice')" />

    <FormCheckbox v-model:model-value="form.values.default" name="default" :label="t('default')" />
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
    "invoice": "Chce otrzymać fakture VAT",
    "billing": {
      "create": {
        "header": "Dodawanie danych rachunku",
        "sucessUpdate": "Pomyślnie dodano rachunek.",
        "failedUpdate": "Nie udało się dodać rachunku"
      },
      "edit": {
        "header": "Edytowanie rachunku",
        "sucessUpdate": "Pomyślnie edytowano rachunek.",
        "failedUpdate": "Nie udało się edytować rachunku"
      }
    },
    "shipping": {
      "create": {
        "header": "Dodawanie adresu dostawy",
        "sucessUpdate": "Pomyślnie dodano adres.",
        "failedUpdate": "Nie udało się dodać adresu"
      },
      "edit": {
        "header": "Edytowanie adresu",
        "sucessUpdate": "Pomyślnie edytowano adres.",
        "failedUpdate": "Nie udało się edytować adresu"
      }
    }
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
const t = useLocalI18n()

const error = ref<Error | null>(null)
const { notify } = useNotify()
const isInvoice = ref<boolean>(false)

const props = defineProps<{
  open: boolean
  type: 'create' | 'edit'
  addressType: 'billing' | 'shipping'
  address?: UserSavedAddress
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'update:submit', value: UserSavedAddress | UserSavedAddressCreateDto): void
}>()

const form = useForm<UserSavedAddressCreateDto | UserSavedAddressUpdateDto>({
  initialValues: {
    default: false,
    name: '',
    address: {
      address: '',
      city: '',
      country: '',
      country_name: '',
      name: '',
      phone: '',
      zip: '',
      vat: '',
    },
  },
})

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

const { add, edit } = useUserAddreses(props.addressType)

const onSubmit = async () => {
  const response =
    props.type === 'create'
      ? await add(form.values)
      : props.address && (await edit(props.address.id, form.values))

  notify({
    title:
      response && response.success
        ? t(`${props.addressType}.${props.type}.sucessUpdate`)
        : t(`${props.addressType}.${props.type}.failedUpdate`),
    type: response && response.success ? 'success' : 'error',
  })

  isModalVisible.value = false
}

onBeforeMount(() => {
  if (props.address) form.values = props.address
  isInvoice.value = !!form.values.address.vat
})
</script>
