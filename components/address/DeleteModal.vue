<template>
  <FormModal
    v-model:open="isModalVisible"
    :form="useForm()"
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
      "confirmDelete": "Czy napewno chcesz usunąć rachunek ?",
      "sucessUpdate": "Pomyślnie usunięto rachunek.",
      "failedUpdate": "Nie można usunąć domyślnego rachunku"
    },
    "shipping": {
      "header": "Usuwanie adresu",
      "delete": "Usuń adres",
      "confirmDelete": "Czy napewno chcesz usunąć adres ?",
      "sucessUpdate": "Pomyślnie usunięto adres.",
      "failedUpdate": "Nie można usunąć domyślnego adresu"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { UserSavedAddress } from '@heseya/store-core'

const props = defineProps<{
  open: boolean
  type: 'billing' | 'shipping'
  address?: UserSavedAddress
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const t = useLocalI18n()
const { notify } = useNotify()
const { remove } = useUserAddreses(props.type)

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

const onSubmit = async () => {
  const response = !props.address?.default && props.address ? await remove(props.address.id) : null

  notify({
    title:
      response && response.success
        ? t(`${props.type}.sucessUpdate`)
        : t(`${props.type}.failedUpdate`),
    type: response && response.success ? 'success' : 'error',
  })
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
