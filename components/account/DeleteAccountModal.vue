<template>
  <LayoutModal v-model:open="isModalVisible" :closeable="false" class="delete-account-modal">
    <form class="delete-account-modal__form" @submit.prevent="onSubmit">
      <h1>{{ t('header') }}</h1>
      <p class="delete-account-modal__question">{{ t('question') }}</p>
      <FormInputPassword
        v-model:model-value="deleteAccountForm.values.currentPassword"
        :label="t('currentPassword')"
        name="currentPassword"
        rules="required"
      />

      <div class="delete-account-modal__actions">
        <LayoutButton
          class="delete-account-modal__button delete-account-modal__button--cancel"
          @click="isModalVisible = false"
          >Anuluj</LayoutButton
        >
        <LayoutButton class="delete-account-modal__button" html-type="submit">Zapisz</LayoutButton>
      </div>
    </form>

    <span class="edit-password-modal__error">{{ errorMessage }}</span>
  </LayoutModal>
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

const props = defineProps<{
  open: boolean
}>()

const errorMessage = ref('')

const deleteAccountForm = useForm({
  initialValues: { currentPassword: '' },
})

const onSubmit = deleteAccountForm.handleSubmit(() => {
  try {
    // TODO add logic to delete account
    // await heseya.Users.deleteSelf(password)
    emit('update:open', false)
  } catch (e: any) {
    errorMessage.value = e.response.data.error.message
  }
})

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
</script>

<style lang="scss" scoped>
.delete-account-modal {
  &__form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    background-color: $gray-color-100;
  }

  &__question {
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
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
