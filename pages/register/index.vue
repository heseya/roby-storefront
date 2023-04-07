<template>
  <button @click="fetchConsents">test</button>
  <form class="register-content" @submit.prevent="onSubmit">
    <div class="register-content__form">
      <h2 class="register-content__header">{{ t('form.header') }}</h2>
      <div class="register-content__container">
        <FormInput
          v-model="form.values.name"
          name="name"
          :label="t('form.name')"
          rules="required"
        />
        <FormInput
          v-model="form.values.surname"
          name="surname"
          :label="t('form.surname')"
          rules="required"
        />
      </div>
      <div class="register-content__container">
        <FormInput
          v-model="form.values.email"
          name="email"
          :label="t('form.email')"
          rules="required|email"
        />
      </div>
      <div class="register-content__container">
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
        @input="(v) => setConsentValue(consent.id, v.returnValue)"
        rules="required"
      >
        <span v-html="consent.description_html"></span>
      </FormCheckbox>
      <div class="register-content__btn-container">
        <LayoutButton class="register-content__btn" :label="t('form.register')" />
      </div>
    </div>
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Rejestracja",
    "form": {
      "email": "Adres e-mail",
      "header": "Rejestracja",
      "register": "Zarejestruj się",
      "name": "Imię",
      "surname": "Nazwisko",
      "password": "Hasło",
      "confirmPassword": "Powtórz hasło",
      "private-policy": "Polityką prywatności",
      "private-policy-description": "Wyrażam zgodę na przetwarzanie moich danych osobowych podanych przeze mnie w formularzu rejestracyjnym, przez ROBICAN S.C. R. JASTRZĘBSKI I WSPÓLNICY UL. ZAKOPIAŃSKA 190, 60-467POZNAŃ, w celu złożenia i prowadzenia konta klienta. Zapoznałem się z",
      "private-policy-agreement": "na temat zasad przetwarzania danych osobowych i ją akceptuję."
    }
  }
}
</i18n>

<script setup lang="ts">
import { Consent, UserConsentDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()

useBreadcrumbs([{ label: 'Rejestracja', link: '/register' }])
useHead({
  title: t('title'),
})

const { data: consents } = useAsyncData(async () => {
  try {
    const consents = await heseya.Consents.get()
    return consents.data
  } catch (e: any) {
    showError({ message: e.message, statusCode: 500 })
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

const registerForm = computed(() => ({
  name: `${form.values.name} ${form.values.surname}`,
  email: form.values.email,
  password: form.values.password,
  consents: consents.value?.reduce(
    (acc, consent) => ({
      ...acc,
      [consent.id]: form.values.consents[consent.id] || false,
    }),
    {} as UserConsentDto,
  ),
  roles: [],
}))

const setConsentValue = (consentId: string, value: boolean) => {
  form.values.consents[consentId] = value
}

const onSubmit = form.handleSubmit(async () => {
  try {
    await heseya.Users.create(registerForm.value)
  } catch (e: any) {
    showError({ message: e.message, statusCode: 500 })
  }
})
</script>

<style lang="scss" scoped>
.register-content {
  padding: 16px;
  width: 100%;

  @media ($viewport-11) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 100px;
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

  &__form {
    display: grid;
    gap: 15px;

    @media ($viewport-11) {
      width: 66%;
    }

    @media ($viewport-16) {
      width: 33%;
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
}
</style>
