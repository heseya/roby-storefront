<template>
  <AccountFormModal
    v-model:open="isModalVisible"
    :form="form"
    :header="t('header')"
    :error="error"
    @submit="onSubmit"
  >
    <FormInput v-model:model-value="form.values.name" :label="t('nameSurname')" name="name" />
    <FormInput
      :label="t('email')"
      :model-value="userStore.user?.email"
      :disabled="true"
      name="email"
    />
  </AccountFormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "header": "Moje dane",
    "nameSurname": "Imię i Nazwisko",
    "email": "Adres Email",
    "sucessUpdate": "Zaktualizowane dane użytkownika."
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { UserProfileUpdateDto } from '@heseya/store-core'
import { useUserStore } from '@/store/user'
const { notify } = useNotify()

const t = useLocalI18n()
const heseya = useHeseya()

const props = defineProps<{
  open: boolean
}>()

const userStore = useUserStore()

const error = ref<any>(null)

const form = useForm<UserProfileUpdateDto>()

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

const onSubmit = form.handleSubmit(async () => {
  try {
    const user = await heseya.UserProfile.update(form.values)
    userStore.setUser(user)
    isModalVisible.value = false
    notify({
      title: t('sucessUpdate'),
      type: 'success',
    })
  } catch (e) {
    error.value = e
  }
})

onMounted(() => {
  form.values = { name: userStore.user?.name }
})
</script>

<style lang="scss" scoped>
.account-form-modal {
}
</style>
