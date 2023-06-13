<template>
  <FormModal
    v-model:open="isModalVisible"
    :values="form.values"
    :header="t('header')"
    :error="error"
    :fullscreen="false"
    @submit="onSubmit"
  >
    <FormInputPassword
      v-model:model-value="form.values.currentPassword"
      :label="$t('form.currentPassword')"
      name="currentPassword"
      rules="required"
    />
    <FormInputPassword
      v-model:model-value="form.values.newPassword"
      :label="t('newPassword')"
      name="newPassword"
      rules="required"
    />
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "header": "Zmiana hasła",
    "newPassword": "Nowe hasło",
    "sucessUpdate": "Hasło zostało zmienione"
  },
  "en": {
    "header": "Change password",
    "newPassword": "New password",
    "sucessUpdate": "Password has been changed"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const { notify } = useNotify()

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
}>()

const error = ref<Error | null>(null)

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
    notify({
      title: t('sucessUpdate'),
      type: 'success',
    })
    isModalVisible.value = false
  } catch (e: any) {
    error.value = e
  }
})
</script>

<style lang="scss" scoped></style>
