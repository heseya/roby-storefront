<template>
  <form class="product-contact-form" @submit.prevent="onSubmit">
    <LayoutLoading :active="isLoading" />

    <p class="product-contact-form__text">
      {{ t('text') }}
    </p>

    <div class="product-contact-form__row">
      <FormInput
        v-model="form.values.name"
        name="name"
        class="product-contact-form__input"
        :label="t('name')"
        rules="required"
        label-uppercase
      />
      <FormInput
        v-model="form.values.email"
        name="email"
        html-type="email"
        class="product-contact-form__input"
        :label="t('email')"
        rules="required|email"
        label-uppercase
      />
    </div>

    <FormTextarea
      v-model="form.values.message"
      name="message"
      class="product-contact-form__input"
      :label="t('message')"
      rules="required"
      label-uppercase
    />

    <LayoutRecaptchaBadge class="product-contact-form__recaptcha" />

    <FormCheckbox v-model="form.values.consent" name="consent" rules="required">
      {{ t('consent', { companyName }) }}
    </FormCheckbox>

    <LayoutButton :disabled="isLoading" html-type="submit" class="product-contact-form__btn">
      {{ actionText || t('actionText') }}
    </LayoutButton>
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "text": "Wypełnienie formularza zajmie tylko chwilę, a dzięki temu otrzymasz od nas wsparcie w wyborze urządzenia i ofertę dopasowaną do Twoich potrzeb.",
    "name": "Imię lub nazwa firmy",
    "email": "Adres email",
    "message": "Wiadomość",
    "consent": "Zgadzam się na kontakt w celach przedstawienia oferty handlowej firmy {companyName}",
    "actionText": "Zapytaj o cenę",
    "successMessage": "Dziękujemy za wysłanie zapytania. Wkrótce się z Tobą skontaktujemy.",
    "recaptcha": {
      "message": "Ta strona korzysta z zabezpieczenia Google reCAPTCHa",
      "privacy": "Prywatność",
      "conditions": "Warunki"
    }
  }
}
</i18n>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { useConfigStore } from '~/store/config'

const props = withDefaults(
  defineProps<{
    product?: ProductList
    actionText?: string
    type: 'price' | 'renting'
  }>(),
  {
    actionText: '',
    product: undefined,
  },
)

const t = useLocalI18n()
const { notify } = useNotify()
const { recaptchaPublic } = usePublicRuntimeConfig()
const config = useConfigStore()

const isLoading = ref(false)
const form = useForm({
  initialValues: {
    name: '',
    email: '',
    message: '',
    consent: false,
  },
})

const companyName = computed(() => config.env.company_name)

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true
  try {
    const recaptchaToken = await getRecaptchaToken(recaptchaPublic)

    await axios.post('/api/contact', {
      ...values,
      type: props.type,
      product: props.product,
      recaptchaToken,
    })

    notify({
      type: 'success',
      text: t('successMessage'),
    })

    form.resetForm()
  } catch (e: any) {
    notify({
      type: 'error',
      text: e.response?.data?.message || e.message,
    })
  }
  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.product-contact-form {
  display: flex;
  position: relative;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 16px;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;

    @media ($viewport-10) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 8px;
    }
  }

  &__btn {
    min-width: 200px;
    margin-left: auto;
  }
}
</style>
