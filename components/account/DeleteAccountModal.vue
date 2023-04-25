<template>
  <AccountFormModal
    v-model:open="isModalVisible"
    :form="form"
    :header="t('header')"
    :error="error"
    :ok-text="t('deleteAccount')"
    @submit="onSubmit"
  >
    <p class="delete-account-modal__question">{{ t('question') }}</p>
    <FormInputPassword
      v-model:model-value="form.values.currentPassword"
      :label="t('currentPassword')"
      name="currentPassword"
      rules="required"
    />
  </AccountFormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "header": "Usuwanie konta",
    "question": "Czy napewno chcesz usunąć konto ?",
    "currentPassword": "Aktualne hasło",
    "sucessUpdate": "Usunięto konto użytkownika.",
    "deleteAccount": "Usuń konto"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useAuthStore } from '@/store/auth'
const t = useLocalI18n()
const heseya = useHeseya()
const { notify } = useNotify()
const auth = useAuthStore()

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
}>()

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

const error = ref<Error | null>(null)

const form = useForm({
  initialValues: { currentPassword: '' },
})

const onSubmit = form.handleSubmit(async () => {
  try {
    await heseya.Users.deleteSelf(form.values.currentPassword)
    isModalVisible.value = false
    notify({
      title: t('sucessUpdate'),
      type: 'success',
    })
    await auth.logout()
  } catch (e: any) {
    error.value = e
  }
})
</script>

<style lang="scss" scoped>
.account-form-modal {
}
</style>
