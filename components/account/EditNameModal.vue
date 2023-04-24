<template>
  <LayoutAccountFormModal
    v-model:open="isModalVisible"
    :form="form"
    :header="t('header')"
    :on-submit="onSubmit"
    :error="error"
  >
    <FormInput v-model:model-value="form.values.name" :label="t('nameSurname')" name="name" />
    <FormInput :label="t('email')" :model-value="user.email" :disabled="true" name="email" />
  </LayoutAccountFormModal>
</template>

<i18n lang="json">
{
  "pl": {
    "header": "Moje dane",
    "nameSurname": "Imię i Nazwisko",
    "email": "Adres Email"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { User, UserProfileUpdateDto } from '@heseya/store-core'
import { useUserStore } from '@/store/user'

const t = useLocalI18n()
const heseya = useHeseya()

const props = defineProps<{
  open: boolean
  user: User
}>()

const userStore = useUserStore()

const error = ref()

const form = useForm<UserProfileUpdateDto>()

const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
  (e: 'update:user', user: User): void
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
  } catch (e) {
    error.value = e
  }
})

onMounted(() => {
  form.values = { name: props.user.name }
})
</script>

<style lang="scss" scoped>
.account-form-modal {
}
</style>
