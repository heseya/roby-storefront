<template>
  <FormModal
    v-model:open="isModalVisible"
    :values="{}"
    :error="errorMessage"
    :header="t(`${type}.header`)"
    :ok-text="t(`${type}.delete`)"
    @submit="onSubmit"
  >
    <h3>{{ t(`${type}.confirmDelete`) }}</h3>
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
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'

const props = defineProps<{
  open: boolean
  type: 'billing' | 'shipping'
  address: UserSavedAddress
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const t = useLocalI18n()
const formatError = useErrorMessage()
const { notify } = useNotify()
const { remove } = useUserAddreses(props.type)

const isModalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const errorMessage = ref()

const onSubmit = async () => {
  const { success, error } = await remove(props.address.id)

  if (!success) {
    errorMessage.value = formatError(error)
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
.address-delete-modal {
  &__actions {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  &__button {
    width: 200px;

    &--cancel {
      background-color: $white-color;
      color: $text-color;
    }
  }

  &__error {
    color: $error-color;
    font-weight: bold;
    text-align: center;
  }
}
</style>
