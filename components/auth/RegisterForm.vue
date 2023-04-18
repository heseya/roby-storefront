<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <LayoutLoading :active="isLoading" />
    <h2 class="register-form__header">{{ t('form.header') }}</h2>
    <div class="register-form__container">
      <FormInput v-model="form.values.name" name="name" :label="t('form.name')" rules="required" />
      <FormInput
        v-model="form.values.surname"
        name="surname"
        :label="t('form.surname')"
        rules="required"
      />
    </div>
    <div class="register-form__container">
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="t('form.email')"
        rules="required|email"
      />
    </div>
    <div class="register-form__container">
      <FormInputPassword
        v-model="form.values.password"
        :label="t('form.password')"
        name="password"
      />
      <FormInputPassword
        v-model="form.values.confirmPassword"
        :label="t('form.confirmPassword')"
        rules="confirmedPassword:@password"
        name="confirmPassword"
      />
    </div>
    <FormCheckbox
      v-for="consent in consents"
      :key="consent.id"
      :model-value="form.values.consents[consent.id] || false"
      :name="consent.name"
      :rules="consent.required ? 'required' : ''"
      :is-required="consent.required"
      @update:model-value="(v) => setConsentValue(consent.id, v)"
    >
      <span v-html="consent.description_html"></span>
    </FormCheckbox>
    <span v-if="errorMessage" class="register-form__error">{{ errorMessage }}</span>
    <div class="register-form__btn-container">
      <LayoutButton class="register-form__btn" :label="t('form.register')" />
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
import { formatApiError, User, UserConsentDto, UserRegisterDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()

const isLoading = ref(false)
const errorMessage = ref('')

const emit = defineEmits<{
  (event: 'registered', value: User): void
}>()

const { data: consents } = useAsyncData(async () => {
  try {
    const consents = await heseya.Consents.get()
    return consents.data
  } catch (e: any) {
    // TODO after merging, change to final version with error translation
    errorMessage.value = formatApiError(e).text
  }
})

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

const registerForm = computed<UserRegisterDto>(() => ({
  name: `${form.values.name} ${form.values.surname}`,
  email: form.values.email,
  password: form.values.password,
  consents:
    consents.value?.reduce(
      (acc, consent) => ({
        ...acc,
        [consent.id]: form.values.consents[consent.id] || false,
      }),
      {},
    ) || {},
  roles: [],
}))

const setConsentValue = (consentId: string, value: boolean) => {
  form.values.consents[consentId] = value
}

const onSubmit = form.handleSubmit(async () => {
  isLoading.value = true

  try {
    const user = await heseya.Auth.register(registerForm.value)
    user && emit('registered', user)
  } catch (e: any) {
    // TODO after merging, change to final version with error translation
    errorMessage.value = formatApiError(e).text
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
