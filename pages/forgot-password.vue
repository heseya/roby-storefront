<template>
  <form class="forgot-password-content" @submit.prevent="onSubmit">
    <div class="forgot-password-content__form">
      <h2 class="forgot-password-content__header">{{ t('form.header') }}</h2>
      <span class="forgot-password-content__description">{{ t('form.description') }}</span>
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="t('form.email')"
        rules="required|email"
      />
      <div class="forgot-password-content__btn-container">
        <LayoutButton
          class="forgot-password-content__btn"
          :label="t('form.send')"
          html-type="submit"
        />
      </div>
      <span v-if="errorMessage" class="forgot-password-content__error">{{ errorMessage }}</span>
      <NuxtLink :to="'/login'" class="forgot-password-content__nav">
        &lt; {{ t('backToLogin') }}</NuxtLink
      >
    </div>
  </form>
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
    }
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

const errorMessage = ref('')

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { appHost } = useRuntimeConfig()

    // TODO: Change to corrent link

    await heseya.Auth.requestResetPassword(values.email, `${appHost}\\new-password`)

    // TODO: Add a message if mail was sent correctly
  } catch (e: any) {
    errorMessage.value = formatApiError(e).text
  }
})
</script>

<style lang="scss" scoped>
.forgot-password-content {
  width: 100%;
  height: 100%;
  padding: 16px;
  margin-top: 50px;
  display: flex;
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

  &__btn {
  }

  &__button {
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
