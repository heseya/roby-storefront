<template>
  <NuxtLayout>
    <div class="forgot-password" @submit.prevent="onSubmit">
      <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
      <form v-if="!formStatus.isSubmitted" class="forgot-password__form">
        <h2 class="forgot-password__header">{{ t('title') }}</h2>
        <span class="forgot-password__description">{{ t('form.description') }}</span>
        <FormInput
          v-model="form.values.email"
          name="email"
          :label="$t('form.email')"
          rules="required|email"
        />
        <LayoutButton class="forgot-password__btn" :label="$t('form.send')" html-type="submit" />

        <span v-if="errorMessage" class="forgot-password__error">{{ errorMessage }}</span>
      </form>
      <div v-else>
        <p>
          {{ t('message') }} <b>{{ formStatus.email }}</b
          >{{ t('message2') }}
        </p>
      </div>
      <NuxtLink :to="localePath('/login')" class="forgot-password__nav">
        &lt; {{ $t('form.backToLogin') }}
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Przypomnij hasło",
    "form": {
      "description": "Jeżeli ten adres e-mail został zarejestrowany w naszym serwisie, otrzymasz link do zrestartowania hasła."
    },
    "message": "Jeżeli istnieje konto powiązane z podanym adresem",
    "message2": ", wysłaliśmy e-mail z linkiem do resetowania hasła."
  },
  "en": {
    "title": "Password reset",
    "form": {
      "description": "If this e-mail address has been registered with us, you will receive a link to reset your password."
    },
    "message": "If there is an account associated with the given address",
    "message2": ", we have sent you an email with a link to reset your password."
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()
const localePath = useLocalePath()

const form = useForm({
  initialValues: {
    email: '',
  },
})

const formStatus = ref<{ isSubmitted: boolean; email: string }>({
  isSubmitted: false,
  email: '',
})

const errorMessage = ref<string>()

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { appHost } = usePublicRuntimeConfig()

    await heseya.Auth.requestResetPassword(values.email, joinUrl('reset-password', appHost))
    formStatus.value = {
      isSubmitted: true,
      email: form.values.email,
    }
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})

const breadcrumbs = computed(() => [{ label: t('title'), link: '/forgot-password' }])
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
    font-weight: 700;
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
    color: var(--error-color);
    font-weight: bold;
    text-align: center;
  }
}
</style>
