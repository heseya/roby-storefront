<template>
  <AddressModal
    v-model:open="isModalVisible"
    :type="type"
    :form="form"
    @submit="onSubmit"
    :header="t(`${type}.header`)"
  >
    <LayoutInfoBox v-if="errorMessage" type="danger">
      {{ errorMessage }}
    </LayoutInfoBox>
  </AddressModal>
</template>

<i18n lang="json">
{
  "pl": {
    "billing": {
      "header": "Dodawanie danych rachunku",
      "sucessUpdate": "Pomyślnie dodano rachunek."
    },
    "shipping": {
      "header": "Dodawanie adresu dostawy",
      "sucessUpdate": "Pomyślnie dodano adres."
    }
  }
}
</i18n>

<script lang="ts" setup>
import { UserSavedAddressCreateDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'
import { useUserStore } from '~/store/user'

const t = useLocalI18n()
const heseya = useHeseya()
const { notify } = useNotify()
const userStore = useUserStore()
const getErrorMessage = useErrorMessage()

const props = defineProps<{
  open: boolean
  type: 'billing' | 'shipping'
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const errorMessage = ref<string | null>(null)

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

const form = useForm<UserSavedAddressCreateDto>({
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

const onSubmit = async () => {
  try {
    props.type === 'billing'
      ? await heseya.UserProfile.saveBillingAddress(form.values)
      : await heseya.UserProfile.saveShippingAddress(form.values)
    await userStore.fetchProfile()
    notify({
      title: t(`${props.type}.sucessUpdate`),
      type: 'success',
    })
    isModalVisible.value = false
  } catch (error: any) {
    errorMessage.value = getErrorMessage(error)
  }
}
</script>
