<template>
  <LayoutModal v-model:open="isModalVisible" :closeable="false" class="edit-password-modal">
    <form class="edit-password-modal__form" @submit.prevent="onSubmit">
      <h1>{{ t('header') }}</h1>
      <FormInputPassword
        v-model:model-value="changePasswordForm.values.currentPassword"
        :label="t('currentPassword')"
        name="currentPassword"
        rules="required"
      />
      <FormInputPassword
        v-model:model-value="changePasswordForm.values.newPassword"
        :label="t('newPassword')"
        name="newPassword"
        rules="required"
      />

      <span class="edit-password-modal__error">{{ errorMessage }}</span>

      <div class="edit-password-modal__actions">
        <LayoutButton
          class="edit-password-modal__button edit-password-modal__button--cancel"
          @click="isModalVisible = false"
          >Anuluj</LayoutButton
        >
        <LayoutButton class="edit-password-modal__button">Zapisz</LayoutButton>
      </div>
    </form>
  </LayoutModal>
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

const errorMessage = ref('')

const changePasswordForm = useForm({
  initialValues: { currentPassword: '', newPassword: '' },
})

const onSubmit = changePasswordForm.handleSubmit(async () => {
  try {
    await heseya.UserProfile.changePassword(changePasswordForm.values)
    emit('update:open', false)
  } catch (e: any) {
    errorMessage.value = e.response.data.error.message
  }
})

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})
</script>

<style lang="scss" scoped>
.edit-password-modal {
  &__form {
    display: grid;
    padding: 20px;
    gap: 20px;
    background-color: $gray-color-100;
  }

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
