<template>
  <div class="forgot-password-content">
    <form v-if="!formStatus.sent" class="forgot-password-content__form" @submit.prevent="onSubmit">
      <h2 class="forgot-password-content__header">{{ t('form.header') }}</h2>
      <span class="forgot-password-content__description">{{ t('form.description') }}</span>
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="t('form.email')"
        rules="required|email"
      />
      <LayoutInfoBox v-if="errorMessage" type="danger" class="login-form__error">
        {{ errorMessage }}
      </LayoutInfoBox>
      <LayoutButton
        class="forgot-password-content__button"
        :label="t('form.send')"
        html-type="submit"
      />
    </form>

    <div v-else>
      {{ t('message') }} <b>{{ formStatus.email }}</b
      >{{ t('message2') }}
    </div>

    <NuxtLink :to="'/login'" class="forgot-password-content__nav"> &lt; Wróć do logowania</NuxtLink>
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
      "send": "Wyślij"
    },
    "message": "Jeżeli istnieje konto powiązane z podanym adresem",
    "message2": ", wysłaliśmy e-mail z linkiem do resetowania hasła."
  }
}
</i18n>

<script setup lang="ts">
import { formatApiError } from '@heseya/store-core'
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()

const form = useForm({
  initialValues: {
    email: '',
  },
})

const formStatus = ref({
  sent: false,
  email: '',
})

const errorMessage = ref('')

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { appHost } = useRuntimeConfig()

    await heseya.Auth.requestResetPassword(values.email, `${appHost}/reset-password`)
    formStatus.value = {
      sent: true,
      email: form.values.email,
    }
  } catch (e: any) {
    errorMessage.value = formatApiError(e).text
  }
})
</script>

<style lang="scss" scoped>
.forgot-password-content {
  padding: 16px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ($viewport-11) {
    justify-content: center;
  }

  &__form {
    display: grid;
    gap: 12px;
    height: 100%;
    width: 100%;

    @media ($viewport-11) {
      width: 66%;
    }

    @media ($viewport-16) {
      width: 20%;
    }
  }

  &__header {
    font-size: 26px;
    font-weight: 800;
  }

  &__button {
    width: 100%;
    padding: 11px 24px;
    margin-top: 10px;
  }

  &__description {
    margin-bottom: 10px;
    font-size: 13px;

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
