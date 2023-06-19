<template>
  <FormModal
    v-model:open="isModalVisible"
    :fullscreen="false"
    :values="form.values"
    :header="t('header')"
    :error="error"
    :ok-text="$t('account.deleteAccount')"
    @submit="onSubmit"
  >
    <p class="delete-account-modal__question">{{ t('question') }}</p>
    <FormInputPassword
      v-model:model-value="form.values.currentPassword"
      :label="$t('form.currentPassword')"
      name="currentPassword"
      rules="required"
    />
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "header": "Usuwanie konta",
    "question": "Czy napewno chcesz usunąć konto?",
    "sucessUpdate": "Usunięto konto użytkownika."
  },
  "en": {
    "header": "Delete account",
    "question": "Are you sure you want to delete your account?",
    "sucessUpdate": "The user account has been deleted."
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useAuthStore } from '@/store/auth'

const { notify } = useNotify()
const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const auth = useAuthStore()

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
}>()

const isModalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
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
.delete-account-modal {
  &__question {
    margin-bottom: 10px;
  }
}
</style>
