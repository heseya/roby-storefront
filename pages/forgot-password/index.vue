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
        <LayoutButton class="forgot-password-content__btn" :label="t('form.send')" />
      </div>
      <NuxtLink :to="'login'" class="forgot-password-content__nav">
        &lt; Wróć do logowania</NuxtLink
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
      "send": "Wyślij"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()

const form = useForm({
  initialValues: {
    email: '',
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { appHost } = useRuntimeConfig()

    await heseya.Auth.requestResetPassword(values.email, appHost)

    // TODO: Add a message if mail was sent correctly
  } catch (e: any) {
    showError({ message: e.message, statusCode: 500 })
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
    width: 100%;
    padding: 11px 24px;
    margin-top: 10px;
    margin-bottom: 30px;
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
  }
}
</style>
