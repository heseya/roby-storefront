<template>
  <div v-if="enabled" class="newsletter-form">
    <div class="newsletter-form__box newsletter-title">
      <LayoutIcon :icon="NewsletterEnvelopeIcon" class="newsletter-title__icon" :size="72" />
      <div class="newsletter-title__content">
        <span class="newsletter-form__title">{{ t('title') }}</span>
        <p class="newsletter-form__text">
          {{ t('text') }}
        </p>
      </div>
    </div>

    <Transition>
      <form v-if="!isSuccess" class="newsletter-form__box" @submit.prevent="onSubmit">
        <div class="newsletter-form__form">
          <FormInput
            v-model="form.values.email"
            name="email"
            type="gray"
            :label="$t('form.email')"
            rules="required|email"
          />
          <LayoutButton html-type="submit" class="newsletter-form__btn" :label="t('btn')" />
        </div>
        <small class="newsletter-form__consent-text">
          {{ t('consent') }}
          <NuxtLink class="primary-text" to="/regulamin"> {{ t('consentStatute') }} </NuxtLink>.
        </small>
      </form>

      <div v-else class="newsletter-form__box newsletter-success">
        <LayoutIcon :icon="CheckIcon" class="newsletter-success__icon" :size="24" />
        <p class="newsletter-success__text">{{ t('successText') }}</p>
      </div>
    </Transition>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Newsletter",
    "text": "Zapisz się do naszego newslettera, aby jako pierwszy dowiadywać się o wszystkich promocjach i nowościach!",
    "consent": "Zapisując się akceptujesz treść",
    "consentStatute": "regulaminu",
    "btn": "Zapisz się",
    "successText": "Dziękujemy za zapisanie się do newslettera!"
  },
  "en": {
    "title": "Newsletter",
    "text": "Sign up for our newsletter to be the first to learn about all promotions and news!",
    "consent": "By signing up, you accept the content of the",
    "consentStatute": "regulations",
    "btn": "Sign up",
    "successText": "Thank you for signing up for the newsletter!"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

import NewsletterEnvelopeIcon from '@/assets/icons/newsletter-envelope.svg?component'
import CheckIcon from '@/assets/icons/check-circle.svg?component'

const t = useLocalI18n()

const isSuccess = ref(false)
const form = useForm({
  initialValues: { email: '' },
})

const { subscribe, enabled } = useNewsletter()

const onSubmit = form.handleSubmit(({ email }) => {
  subscribe(email)
  isSuccess.value = true
})
</script>

<style lang="scss" scoped>
.newsletter-form {
  max-width: $container-width;
  border: solid 1px $gray-color-300;
  border-radius: 4px;
  padding: 24px;
  margin: 32px $container-padding;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  @media ($viewport-4) {
    padding: 43px 46px;
    margin: 64px $container-padding;
  }

  @media ($viewport-7) {
    grid-template-columns: 1fr 1fr;
  }

  @media ($viewport-128) {
    margin: 64px auto;
  }

  &__title {
    display: block;
    font-size: rem(24);
    font-weight: 500;
    margin-bottom: 16px;
  }

  &__text {
    font-size: rem(14);
    line-height: rem(19);
  }

  &__consent-text {
    display: block;
    font-size: rem(12);
    line-height: rem(16);
    color: $gray-color-500;
    margin-top: 16px;
  }

  &__form {
    display: flex;
    align-items: flex-end;

    > :deep(.btn) {
      height: 43px;
    }
  }

  &__btn {
    width: 132px;
    position: relative;
    transform: translateX(-4px);
    white-space: nowrap;
  }
}

.newsletter-title {
  display: flex;
  align-items: flex-start;

  &__icon {
    position: relative;
    transform: translate(10px, -32px);
  }

  &__content {
    position: relative;
  }
}

.newsletter-success {
  display: flex;
  justify-content: center;
  align-items: center;

  &__text {
    margin-left: 8px;
    font-size: rem(16);
    font-weight: 500;
  }
}
</style>
