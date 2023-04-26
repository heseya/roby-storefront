<template>
  <form class="register-form" disabled @submit.prevent="onSubmit">
    <LayoutLoading :active="isLoading" />
    <h2 class="register-form__header">{{ t('form.header') }}</h2>
    <div class="register-form__container">
      <FormInput
        v-model="form.values.name"
        name="name"
        :label="t('form.name')"
        rules="required"
        :disabled="isFormDisabled"
      />
      <FormInput
        v-model="form.values.surname"
        name="surname"
        :label="t('form.surname')"
        rules="required"
        :disabled="isFormDisabled"
      />
    </div>
    <div class="register-form__container">
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="t('form.email')"
        rules="required|email"
        :disabled="isFormDisabled"
      />
    </div>
    <div class="register-form__container">
      <FormInputPassword
        v-model="form.values.password"
        :label="t('form.password')"
        name="password"
        :disabled="isFormDisabled"
      />
      <FormInputPassword
        v-model="form.values.confirmPassword"
        :label="t('form.confirmPassword')"
        rules="confirmedPassword:@password"
        name="confirmPassword"
        :disabled="isFormDisabled"
      />
    </div>
    <AccountConsentsList
      v-if="form.values.consents"
      v-model:userConsents="form.values.consents"
      @error="(e) => (consentsListError = formatError(e))"
    />
    <LayoutInfoBox
      v-if="errorMessage || consentsListError"
      type="danger"
      class="register-form__error"
    >
      {{ errorMessage || consentsListError }}
    </LayoutInfoBox>
    <div class="register-form__btn-container">
      <LayoutButton
        :disabled="isFormDisabled"
        html-type="submit"
        class="register-form__btn"
        :label="t('form.register')"
      />
    </div>
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "form": {
      "email": "Adres e-mail",
      "header": "Rejestracja",
      "register": "Zarejestruj się",
      "name": "Imię",
      "surname": "Nazwisko",
      "password": "Hasło",
      "confirmPassword": "Powtórz hasło"
    }
  }
}
</i18n>

<script setup lang="ts">
import { User, UserConsentDto, UserRegisterDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()

const isLoading = ref(false)
const errorMessage = ref('')
const consentsListError = ref<string>('')

const emit = defineEmits<{
  (event: 'registered', value: User): void
}>()

const form = useForm({
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    consents: {} as UserConsentDto,
  },
})

const isFormDisabled = computed(() => !!consentsListError.value)

const registerForm = computed<UserRegisterDto>(() => ({
  name: `${form.values.name} ${form.values.surname}`,
  email: form.values.email,
  password: form.values.password,
  consents: form.values.consents,
  roles: [],
}))

const onSubmit = form.handleSubmit(async () => {
  isLoading.value = true

  try {
    const user = await heseya.Auth.register(registerForm.value)
    user && emit('registered', user)
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
    font-weight: 800;
    margin-top: 10px;

    @media ($viewport-11) {
      font-size: 2.2rem;
      margin-bottom: 20px;
      margin-top: 0px;
    }
  }

  &__policy-agreement {
    color: $primary-color;
  }

  &__error {
    color: $error-color;
    font-weight: bold;
    text-align: center;
  }
}
</style>
