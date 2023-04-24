<template>
  <LayoutAccountFormModal
    v-model:open="isModalVisible"
    :form="form"
    :header="t('header')"
    :on-submit="onSubmit"
    :error="error"
  >
    <FormInputPassword
      v-model:model-value="form.values.currentPassword"
      :label="t('currentPassword')"
      name="currentPassword"
      rules="required"
    />
    <FormInputPassword
      v-model:model-value="form.values.newPassword"
      :label="t('newPassword')"
      name="newPassword"
      rules="required"
    />
  </LayoutAccountFormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "header": "Zmiana hasła",
    "currentPassword": "Aktualne hasło",
    "newPassword": "Nowe hasło"
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

const error = ref()

const form = useForm({
  initialValues: { currentPassword: '', newPassword: '' },
})

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

const onSubmit = form.handleSubmit(async () => {
  try {
    await heseya.UserProfile.changePassword(form.values)
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
