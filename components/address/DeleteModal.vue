<template>
  <AddressModal
    v-model:open="isModalVisible"
    :type="type"
    :form="form"
    @submit="onSubmit"
    :disabled="true"
    :save-button-text="t('delete')"
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
    "delete": "Usuń",
    "billing": {
      "header": "Usuwanie rachunku",
      "sucessUpdate": "Pomyślnie usunięto rachunek.",
      "failedUpdate": "Nie można usunąć domyślnego rachunku"
    },
    "shipping": {
      "header": "Usuwanie adresu",
      "sucessUpdate": "Pomyślnie usunięto adres.",
      "failedUpdate": "Nie można usunąć domyślnego adresu"
    }
  }
}
</i18n>

<script lang="ts" setup>
import { UserSavedAddress } from '@heseya/store-core'
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
  value: UserSavedAddress
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

const form = useForm<UserSavedAddress>({ initialValues: props.value })

const onSubmit = async () => {
  try {
    if (!form.values.default) {
      props.type === 'billing'
        ? await heseya.UserProfile.removeBillingAddress(form.values.id)
        : await heseya.UserProfile.removeShippingAddress(form.values.id)
      await userStore.fetchProfile()
      notify({
        title: t(`${props.type}.sucessUpdate`),
        type: 'success',
      })
      isModalVisible.value = false
    } else {
      notify({
        title: t(`${props.type}.failedUpdate`),
        type: 'error',
      })
    }
  } catch (error: any) {
    errorMessage.value = getErrorMessage(error)
  }
}
</script>
