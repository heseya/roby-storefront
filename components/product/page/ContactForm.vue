<template>
  <form class="product-contact-form" @submit.prevent="onSubmit">
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
      />
      <FormInput
        v-model="form.values.email"
        name="email"
        html-type="email"
        class="product-contact-form__input"
        :label="t('email')"
        rules="required|email"
      />
    </div>

    <FormInput
      v-model="form.values.message"
      name="message"
      class="product-contact-form__input"
      :label="t('message')"
      rules="required"
    />

    <FormCheckbox v-model="form.values.consent" name="consent" rules="required">
      {{ t('consent', { companyName: COMPANY_NAME }) }}
    </FormCheckbox>

    <LayoutButton html-type="submit" class="product-contact-form__btn">
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
    "actionText": "Zapytaj o cenę"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

withDefaults(
  defineProps<{
    productId: string
    actionText?: string
  }>(),
  {
    actionText: '',
  },
)

const t = useLocalI18n()

const form = useForm({
  initialValues: {
    name: '',
    email: '',
    message: '',
    consent: false,
  },
})

// TODO: This should not be hardcoded
const COMPANY_NAME = '***REMOVED*** s.c.'

const onSubmit = form.handleSubmit((values) => {
  // TODO: send this form somewhere
  console.log(values)
})
</script>

<style lang="scss" scoped>
.product-contact-form {
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 16px;
  }

  &__text {
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
    margin-left: auto;
  }
}
</style>
