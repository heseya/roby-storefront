<template>
  <FormModal
    v-model:open="isModalVisible"
    :fullscreen="false"
    :values="{}"
    :error="requestError"
    :header="t(`${type}.header`)"
    :ok-text="t(`${type}.delete`)"
    @submit="onSubmit"
  >
    <div class="address-delete-modal">{{ t(`${type}.confirmDelete`) }}</div>
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "billing": {
      "header": "Usuwanie rachunku",
      "delete": "Usuń rachunek",
      "confirmDelete": "Czy napewno chcesz usunąć rachunek?",
      "sucessUpdate": "Pomyślnie usunięto rachunek"
    },
    "shipping": {
      "header": "Usuwanie adresu",
      "delete": "Usuń adres",
      "confirmDelete": "Czy napewno chcesz usunąć adres?",
      "sucessUpdate": "Pomyślnie usunięto adres"
    }
  },
  "en": {
    "billing": {
      "header": "Deleting billing data",
      "delete": "Delete billing data",
      "confirmDelete": "Are you sure you want delete billing data?",
      "sucessUpdate": "Billing data deleted successfully"
    },
    "shipping": {
      "header": "Deleting shipping address",
      "delete": "Delete shipping address",
      "confirmDelete": "Are you sure you want delete shipping address?",
      "sucessUpdate": "Shipping address deleted successfully"
    }
  }
}
</i18n>

<script setup lang="ts">
import type { UserSavedAddress } from '@heseya/store-core'

const props = defineProps<{
  open: boolean
  type: 'billing' | 'shipping'
  address: UserSavedAddress
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const t = useLocalI18n()
const { notify } = useNotify()
const { remove } = useUserAddreses(props.type)

const isModalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const requestError = ref<any>('')

const onSubmit = async () => {
  const { success, error } = await remove(props.address.id)

  if (!success) {
    requestError.value = error
  } else {
    notify({
      title: t(`${props.type}.sucessUpdate`),
      type: 'success',
    })

    isModalVisible.value = false
  }
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
