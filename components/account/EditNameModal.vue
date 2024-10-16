<template>
  <FormModal
    v-model:open="isModalVisible"
    :values="form.values"
    :header="$t('account.myData')"
    :fullscreen="false"
    :error="error"
    @submit="onSubmit"
  >
    <FormInput
      v-model="form.values.name"
      :label="$t('form.nameAndSurname')"
      name="name"
      rules="alphaSpaces"
    />
    <FormInput
      :label="$t('form.email')"
      :model-value="userStore.user?.email"
      :disabled="true"
      name="email"
    />
    <FormInput v-model="form.values.phone" :label="$t('form.phone')" name="phone" />
    <FormInput
      v-model="form.values.birthdayDate"
      :disabled="!!form.values.birthdayDate"
      :label="$t('form.birthdayDate')"
      name="birthdayDate"
      rules="beforeNow"
      html-type="date"
    />
  </FormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "sucessUpdate": "Zaktualizowano dane użytkownika."
  },
  "en": {
    "sucessUpdate": "User data has been updated."
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useUserStore } from '@/store/user'
const { notify } = useNotify()

const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()

const props = defineProps<{
  open: boolean
}>()

const userStore = useUserStore()

const error = ref<Error | null>(null)

const form = useForm({
  initialValues: { name: '', phone: '', birthdayDate: '' },
})

const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
}>()

const isModalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const onSubmit = form.handleSubmit(async () => {
  error.value = null
  try {
    const user = await heseya.UserProfile.update({
      name: form.values.name,
      phone: form.values.phone || null,
      birthday_date: form.values.birthdayDate || undefined,
    })
    userStore.setUser(user)
    isModalVisible.value = false
    notify({
      title: t('sucessUpdate'),
      type: 'success',
    })
  } catch (e: any) {
    error.value = e
  }
})

watch(
  () => props.open,
  () => {
    form.values.name = userStore.user?.name || ''
    form.values.phone = userStore.user?.phone || ''
    form.values.birthdayDate = userStore.user?.birthday_date || ''
  },
)
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
