<template>
  <div v-if="edroneEnabled" class="newsletter-form">
    <div class="newsletter-form__box">
      <span class="newsletter-form__title">TODO: Newsletter</span>
      <p class="newsletter-form__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quo earum iusto, sint eveniet
        cum dolorem veniam est qui amet dolore saepe ex dolores nulla quas adipisci id provident
        voluptatum!
      </p>
    </div>

    <form v-if="!isSuccess" class="newsletter-form__box" @submit.prevent="onSubmit">
      <div class="newsletter-form__form">
        <FormInput
          v-model="form.values.email"
          name="email"
          :label="$t('form.email')"
          rules="required|email"
        />
        <LayoutButton
          html-type="submit"
          class="newsletter-form__btn"
          :label="$t('account.register')"
        />
      </div>
      <small> Lorem ipsum dolor sit amet consectetur adipisicing elit. </small>
    </form>

    <div v-else class="newsletter-form__box">Dziękujemy za zapisanie się do newslettera!</div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const isSuccess = ref(false)
const form = useForm({
  initialValues: { email: '' },
})

const { subscribe, enabled: edroneEnabled } = useEdrone()

const onSubmit = form.handleSubmit(({ email }) => {
  subscribe({
    email,
    customer_tags: 'Newsletter',
    first_name: '',
  })
  isSuccess.value = true
})
</script>

<style lang="scss" scoped>
.newsletter-form {
  max-width: $container-width;
  padding: $container-padding;
  background-color: $gray-color-300;
  margin: 32px auto;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  @media ($viewport-5) {
    grid-template-columns: 1fr 1fr;
  }

  &__title {
    display: block;
    font-size: rem(24);
    font-weight: 500;
    margin-bottom: 8px;
  }

  &__form {
    display: flex;
    align-items: flex-end;

    > :deep(.btn) {
      height: 43px;
    }
  }
}
</style>
