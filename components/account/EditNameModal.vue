<template>
  <LayoutModal v-model:open="isModalVisible" :closeable="false" class="edit-name-modal">
    <form class="edit-name-modal__form" @submit.prevent="onSubmit">
      <h1>{{ t('header') }}</h1>
      <FormInput v-model:model-value="userForm.values.name" :label="t('nameSurname')" name="name" />
      <FormInput :label="t('email')" :model-value="user.email" :disabled="true" name="email" />
      <div class="edit-name-modal__actions">
        <LayoutButton
          class="edit-name-modal__button edit-name-modal__button--cancel"
          @click="isModalVisible = false"
          >Anuluj</LayoutButton
        >
        <LayoutButton class="edit-name-modal__button" html-type="submit">Zapisz</LayoutButton>
      </div>
    </form>
  </LayoutModal>
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

const t = useLocalI18n()
const heseya = useHeseya()

const props = defineProps<{
  open: boolean
  user: User
}>()

const userForm = useForm<UserProfileUpdateDto>()

const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
  (e: 'update:user', user: User): void
}>()

const onSubmit = userForm.handleSubmit(async () => {
  const user = await heseya.UserProfile.update(userForm.values)
  emit('update:user', user)
})

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

onMounted(() => {
  userForm.values = { name: props.user.name }
})
</script>

<style lang="scss" scoped>
.edit-name-modal {
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
}
</style>
