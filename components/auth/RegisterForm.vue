<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <LayoutLoading :active="isLoading" />
    <h2 class="register-form__header">{{ $t('account.registerTitle') }}</h2>
    <div class="register-form__container">
      <FormInput
        v-model="form.values.name"
        name="name"
        :label="t('form.name')"
        rules="required|alpha"
        :disabled="isFormDisabled"
      />
      <FormInput
        v-model="form.values.surname"
        name="surname"
        :label="t('form.surname')"
        rules="required|alpha"
        :disabled="isFormDisabled"
      />
    </div>
    <div class="register-form__container">
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="$t('form.email')"
        rules="required|email"
        autocomplete="username"
        :disabled="isFormDisabled"
      />
    </div>
    <div class="register-form__container">
      <FormInputPassword
        v-model="form.values.password"
        :label="$t('form.password')"
        name="password"
        autocomplete="new-password"
        :disabled="isFormDisabled"
      />
      <FormInputPassword
        v-model="form.values.confirmPassword"
        :label="$t('form.confirmPassword')"
        rules="confirmedPassword:@password|required"
        name="confirmPassword"
        autocomplete="new-password"
        :disabled="isFormDisabled"
      />
    </div>

    <AccountConsentsList
      v-model:value="form.values.consents"
      @error="(e) => (consentsListError = formatError(e))"
    >
      <NewsletterConsent v-if="newsletterEnabled" v-model="newsletterConsent" />
    </AccountConsentsList>

    <LayoutInfoBox
      v-show="errorMessage || consentsListError"
      type="danger"
      class="register-form__error"
    >
      {{ errorMessage || consentsListError }}
    </LayoutInfoBox>

    <LayoutRecaptchaBadge />

    <div class="register-form__btn-container">
      <LayoutButton
        :disabled="isFormDisabled"
        html-type="submit"
        class="register-form__btn"
        :label="$t('account.register')"
      />
    </div>
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "form": {
      "name": "Imię",
      "surname": "Nazwisko"
    }
  },
  "en": {
    "form": {
      "name": "Name",
      "surname": "Surname"
    }
  }
}
</i18n>

<script setup lang="ts">
import { HeseyaEvent } from '@heseya/store-core'
import type { User, UserConsentDto, UserRegisterDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()
const { recaptchaPublic } = usePublicRuntimeConfig()

const isLoading = ref(false)
const errorMessage = ref('')
const consentsListError = ref<string>('')

const newsletterConsent = ref(false)
const { subscribe: newsletterSubscribe, enabled: newsletterEnabled } = useNewsletter()

const emit = defineEmits<{
  (event: 'registered', value: User): void
}>()

export interface CreateUserForm {
  email: string
  password: string
  confirmPassword: string
  name: string
  surname: string
  consents: UserConsentDto
}

const form = useForm<CreateUserForm>({
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    consents: {},
  },
})

const isFormDisabled = computed(() => !!consentsListError.value)

const registerFormDto = computed<UserRegisterDto>(() => ({
  name: `${form.values.name} ${form.values.surname}`,
  email: form.values.email,
  password: form.values.password,
  consents: form.values.consents,
}))

const onSubmit = form.handleSubmit(async () => {
  const ev = useHeseyaEventBus()

  isLoading.value = true

  try {
    const recaptchaToken = await getRecaptchaToken(recaptchaPublic, 'register')
    const user = await heseya.Auth.register({
      ...registerFormDto.value,
      captcha_token: recaptchaToken,
    })
    if (newsletterConsent.value) newsletterSubscribe(user.email)

    ev.emit(HeseyaEvent.Register, user)
    emit('registered', user)
  } catch (e: any) {
    errorMessage.value = formatError(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.register-form {
  display: grid;
  position: relative;
  gap: 15px;

  @media ($viewport-11) {
    width: 66%;
  }

  @media ($viewport-16) {
    width: 33%;
  }

  &__container {
    width: 100%;
    display: grid;
    gap: 20px;

    @media ($viewport-11) {
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
  }

  &__btn-container {
    display: flex;
    justify-content: center;
  }

  &__btn {
    width: 100%;
    padding: 11px 24px;

    @media ($viewport-11) {
      width: 50%;
    }
  }

  &__header {
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;

    @media ($viewport-11) {
      font-size: 2.2rem;
      margin-bottom: 20px;
      margin-top: 0px;
    }
  }

  &__policy-agreement {
    color: var(--secondary-color);
  }

  &__error {
    color: var(--error-color);
    font-weight: bold;
    text-align: center;
  }
}
</style>
