<template>
  <FormModal
    v-model:open="isModalVisible"
    :form="form"
    :header="t(`${addressType}.${type}.header`)"
    :error="error"
    :ok-text="type === 'delete' ? t('delete') : t('save')"
    @submit="onSubmit"
  >
    <FormInput
      v-model:model-value="form.values.name"
      rules="required"
      :label="t('form.name')"
      name="name"
      :disabled="disabled"
    />
    <CheckoutFormAddress
      :invoice="invoice"
      :address="form.values.address"
      :disabled="disabled"
      @update:address="(value) => (form.values.address = value)"
    />

    <FormCheckbox v-if="!disabled" v-model="invoice" name="invoice" :label="t('invoice')" />

    <FormCheckbox
      v-if="!disabled"
      v-model:model-value="form.values.default"
      name="default"
      :label="t('default')"
    />

    <LayoutInfoBox v-if="errorMessage" type="danger">
      {{ errorMessage }}
    </LayoutInfoBox>
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "save": "Zapisz",
    "delete": "Usuń",
    "default": "Ustaw jako domyślny",
    "form": {
      "name": "Nazwa"
    },
    "invoice": "Chce otrzymać fakture VAT",
    "billing": {
      "create": {
        "header": "Dodawanie danych rachunku",
        "sucessUpdate": "Pomyślnie dodano rachunek."
      },
      "edit": {
        "header": "Edytowanie rachunku",
        "sucessUpdate": "Pomyślnie edytowano rachunek."
      },
      "delete": {
        "header": "Usuwanie rachunku",
        "sucessUpdate": "Pomyślnie usunięto rachunek.",
        "failedUpdate": "Nie można usunąć domyślnego rachunku"
      }
    },
    "shipping": {
      "create": {
        "header": "Dodawanie adresu dostawy",
        "sucessUpdate": "Pomyślnie dodano adres."
      },
      "edit": {
        "header": "Edytowanie adresu",
        "sucessUpdate": "Pomyślnie edytowano adres."
      },
      "delete": {
        "header": "Usuwanie adresu",
        "sucessUpdate": "Pomyślnie usunięto adres.",
        "failedUpdate": "Nie można usunąć domyślnego adresu"
      }
    }
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { UserSavedAddress, UserSavedAddressCreateDto } from '@heseya/store-core'
import { useUserStore } from '~/store/user'
const t = useLocalI18n()

const error = ref<Error | null>(null)
const { notify } = useNotify()
const invoice = ref<boolean>(false)

const heseya = useHeseya()
const getErrorMessage = useErrorMessage()
const props = defineProps<{
  open: boolean
  type: 'create' | 'edit' | 'delete'
  addressType: 'billing' | 'shipping'
  address?: UserSavedAddress
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'update:submit', value: UserSavedAddress | UserSavedAddressCreateDto): void
}>()

const userStore = useUserStore()

const errorMessage = ref<string | null>(null)

const form = useForm<UserSavedAddressCreateDto | UserSavedAddress>({
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

const disabled = computed(() => props.type === 'delete')

const onSubmit = async () => {
  try {
    switch (props.type) {
      case 'create':
        props.addressType === 'billing'
          ? await heseya.UserProfile.saveBillingAddress(form.values)
          : await heseya.UserProfile.saveShippingAddress(form.values)
        break
      case 'edit':
        if (props.address) {
          props.addressType === 'billing'
            ? await heseya.UserProfile.updateBillingAddress(props.address.id, form.values)
            : await heseya.UserProfile.updateShippingAddress(props.address.id, form.values)
        }
        break
      case 'delete':
        if (!form.values.default && props.address) {
          props.addressType === 'billing'
            ? await heseya.UserProfile.removeBillingAddress(props.address.id)
            : await heseya.UserProfile.removeShippingAddress(props.address.id)
        } else {
          notify({
            title: t(`${props.addressType}.${props.type}.failedUpdate`),
            type: 'error',
          })
          return
        }
        break
    }

    await userStore.fetchProfile()
    notify({
      title: t(`${props.addressType}.${props.type}.sucessUpdate`),
      type: 'success',
    })
    isModalVisible.value = false
  } catch (error: any) {
    errorMessage.value = getErrorMessage(error)
  }
}

onBeforeMount(() => {
  if (props.address) form.values = props.address
  invoice.value = !!form.values.address.vat
})
</script>
