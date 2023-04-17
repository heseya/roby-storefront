<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <div class="login-form__form">
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="t('form.email')"
        rules="required|email"
      />
      <FormInputPassword
        v-model="form.values.password"
        :label="t('form.password')"
        name="password"
        rules="required"
      />
    </div>
    <div class="login-form__options">
      <NuxtLink class="login-form__forgot-password" to="/forgot-password">
        {{ t('form.forgot-password') }}
      </NuxtLink>
    </div>
    <LayoutInfoBox v-if="errorMessage" type="danger" class="login-form__error">
      {{ errorMessage }}
    </LayoutInfoBox>
    <LayoutButton class="login-form__btn" :label="t('form.login')" />
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "form": {
      "login": "Zaloguj się",
      "email": "Adres e-mail",
      "forgot-password": "Nie pamiętasz hasła?",
      "password": "Hasło"
    },
    "message": {
      "success": "Zalogowano pomyślnie"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { formatApiError } from '@heseya/store-core'
import { useAuthStore } from '@/store/auth'

const t = useLocalI18n()

const auth = useAuthStore()
const { notify } = useNotify()

const emit = defineEmits<{
  (event: 'login'): void
}>()

const errorMessage = ref<string | null>(null)

const form = useForm({
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = form.handleSubmit(async ({ email, password }) => {
  const { success, error } = await auth.login({ email, password })
  if (!success) {
    // TODO: translate error using key
    errorMessage.value = formatApiError(error).title
  } else {
    notify({
      title: t('message.success'),
      type: 'success',
    })
    emit('login')
  }
})
</script>
<style lang="scss" scoped>
.login-form {
  &__options {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    margin: 1rem 0;
  }

  &__forgot-password {
    color: $blue-color;
    cursor: pointer;
    font-size: 12px;
    text-decoration: none;
  }

  &__form {
    display: grid;
    gap: 15px;
    margin-top: 15px;
  }

  &__btn {
    padding: 11px 0px;
    width: 100%;
  }
}
</style>
