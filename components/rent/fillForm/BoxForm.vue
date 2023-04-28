<template>
  <form class="box-form" @submit.prevent="onSubmit">
    <span>
      Wypełnienie formularza zajmie tylko chwilę, a dzięki temu otrzymasz od nas wsparcie w wyborze
      urządzenia i ofertę dopasowaną do Twoich potrzeb.
    </span>
    <FormInput
      v-model="form.values.name"
      name="name"
      label="Imię lub nazwa firmy"
      rules="required"
    />
    <FormInput
      v-model="form.values.email"
      name="email"
      label="Adres e-mail"
      rules="required|email"
    />
    <div>
      <FormTextarea
        v-model="form.values.message"
        name="message"
        label="Wiadomość"
        rules="required"
      />
      <FormCheckbox
        v-model="form.values.consent"
        name="consent"
        label="Zgadzam się na kontakt w celach przedstawienia oferty handlowej firmy ***REMOVED*** s.c."
      />
    </div>
    <LayoutButton label="Wyślij" class="box-form__button" type="submit" />
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

const form = useForm({
  initialValues: {
    name: '',
    email: '',
    message: '',
    consent: false,
  },
})

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
})
</script>

<style lang="scss" scoped>
.box-form {
  max-width: 500px;
  padding: 25px;
  @include flex-column;
  gap: 12px;
  border-radius: 4px;

  background-color: $gray-color-100;

  &__button {
    align-self: flex-end;
    max-width: 110px;
  }
}
</style>
