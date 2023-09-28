<template>
  <div class="checkout-consents">
    <FormCheckbox
      v-if="newsletterEnabled || ceneoEnabled"
      v-model="allAccepted"
      class="all-consent"
      name="all-consent"
    >
      {{ t('acceptAllText') }}
    </FormCheckbox>

    <FormCheckbox
      v-model="checkout.consents.statute"
      rules="required"
      :class="{ 'checkout-consents__indented': newsletterEnabled }"
      name="statute-consent"
    >
      {{ t('statuteText') }}
    </FormCheckbox>

    <NewsletterConsent
      v-if="newsletterEnabled"
      v-model="checkout.consents.newsletter"
      class="checkout-consents__indented"
    />

    <CeneoConsent
      v-if="ceneoEnabled"
      v-model="checkout.consents.ceneo"
      class="checkout-consents__indented"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "acceptAllText": "Akceptuję wszystkie zgody",
    "statuteText": "Akceptuje regulamin oraz politykę prywatności."
  },
  "en": {
    "acceptAllText": "I accept all consents",
    "statuteText": "I accept the terms and conditions and privacy policy."
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'
import { useCeneo } from '~/composables/useCeneo'

const t = useLocalI18n()

const checkout = useCheckoutStore()

const { enabled: newsletterEnabled } = useNewsletter()
const { enabled: ceneoEnabled } = useCeneo()

const allAccepted = computed({
  get(): boolean {
    return checkout.consents.newsletter && checkout.consents.statute && checkout.consents.ceneo
  },
  set(value: boolean) {
    checkout.consents.statute = value

    if (newsletterEnabled) {
      checkout.consents.newsletter = value
    }

    if (ceneoEnabled) {
      checkout.consents.ceneo = value
    }
  },
})
</script>

<style lang="scss" scoped>
.checkout-consents {
  font-size: rem(10);

  &__indented {
    margin-left: 24px;
  }
}
</style>
