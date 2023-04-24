<template>
  <AccountFormModal
    v-model:open="isModalVisible"
    :form="form"
    :header="t('header')"
    :on-submit="onSubmit"
    :error="error"
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
    "currentPassword": "Aktualne hasło"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
const t = useLocalI18n()
const heseya = useHeseya()

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

const error = ref()

const form = useForm({
  initialValues: { currentPassword: '' },
})

const onSubmit = form.handleSubmit(async () => {
  try {
    await heseya.Users.deleteSelf(form.values.currentPassword)
    isModalVisible.value = false
  } catch (e: any) {
    error.value = e
  }
})
</script>

<style lang="scss" scoped>
.account-form-modal {
}
</style>
