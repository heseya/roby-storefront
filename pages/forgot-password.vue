<template>
  <div class="forgot-password" @submit.prevent="onSubmit">
    <form v-if="!formStatus.send" class="forgot-password__form">
      <h2 class="forgot-password__header">{{ t('form.header') }}</h2>
      <span class="forgot-password__description">{{ t('form.description') }}</span>
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="t('form.email')"
        rules="required|email"
      />
      <LayoutButton class="forgot-password__btn" :label="t('form.send')" html-type="submit" />

      <span v-if="errorMessage" class="forgot-password__error">{{ errorMessage }}</span>
    </form>
    <div v-else>
      <p>
        {{ t('message') }}<b>{{ formStatus.email }}</b
        >{{ t('message2') }}
      </p>
    </div>
    <NuxtLink :to="'/login'" class="forgot-password__nav">
      &lt; {{ t('form.backToLogin') }}</NuxtLink
    >
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Przypomnij hasło",
    "form": {
      "email": "Adres e-mail",
      "header": "Przypomnij hasło",
      "description": "Jeżeli ten adres e-mail został zarejestrowany w naszym serwisie, otrzymasz link do zrestartowania hasła.",
      "send": "Wyślij",
      "backToLogin": "Wróć do logowania"
    },
    "message": "Jeżeli istnieje konto powiązane z podanym adresem ",
    "message2": ", wysłaliśmy e-mail z linkiem do resetowania hasła."
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()

useBreadcrumbs([
  { label: 'Rejestracja', link: '/register' },
  { label: 'Przypomnij hasło', link: '/forgot-password' },
])

const form = useForm({
  initialValues: {
    email: '',
  },
})

const formStatus = ref<{ send: boolean; email: string }>({
  send: false,
  email: '',
})

const errorMessage = ref<string | null>(null)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { appHost } = useRuntimeConfig()

    await heseya.Auth.requestResetPassword(values.email, `${appHost}/reset-password`)
    formStatus.value = {
      send: true,
      email: form.values.email,
    }
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>

<style lang="scss" scoped>
.forgot-password {
  padding: 16px;
  margin-top: 50px;
  display: grid;
  justify-items: center;

  @media ($viewport-11) {
    justify-content: center;
  }

  &__form {
    display: grid;
    gap: 12px;

    @media ($viewport-11) {
      width: 66%;
    }

    @media ($viewport-14) {
      width: 55%;
    }
  }

  &__header {
    font-size: 26px;
    font-weight: 800;
  }

  &__btn {
    font-size: 13px;
    width: 100%;

    @media ($viewport-11) {
      font-size: 14px;
    }
  }

  &__nav {
    text-align: center;
    text-decoration: none;
    color: $text-color;
    font-weight: 500;
    margin-top: 30px;
  }

  &__error {
    color: $error-color;
    font-weight: bold;
    text-align: center;
  }
}
</style>
