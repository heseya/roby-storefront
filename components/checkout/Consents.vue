<template>
  <div class="checkout-consents">
    <FormCheckbox
      v-if="newsletterEnabled || ceneoEnabled"
      v-model="allAccepted"
      class="all-consent"
      :disabled="disabled"
      name="all-consent"
    >
      {{ t('acceptAllText') }}
    </FormCheckbox>

    <FormCheckbox
      v-model="checkout.consents.statute"
      rules="required"
      :class="{ 'checkout-consents__indented': newsletterEnabled }"
      :disabled="disabled"
      name="statute-consent"
    >
      {{ t('statute.accept') }}
      <a v-if="statuteUrl" :href="statuteUrl.toString()" target="_blank">
        {{ t('statute.statute') }}
      </a>
      <template v-else>{{ t('statute.statute') }}</template>
      {{ t('statute.and') }}
      <a v-if="privacyPolicyUrl" :href="privacyPolicyUrl.toString()" target="_blank">
        {{ t('statute.privacyPolicy') }}
      </a>
      <template v-else>{{ t('statute.privacyPolicy') }}</template>
    </FormCheckbox>

    <NewsletterConsent
      v-if="newsletterEnabled"
      v-model="checkout.consents.newsletter"
      :disabled="disabled"
      class="checkout-consents__indented"
    />

    <CeneoConsent
      v-if="ceneoEnabled"
      v-model="checkout.consents.ceneo"
      :disabled="disabled"
      class="checkout-consents__indented"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "acceptAllText": "Akceptuję wszystkie zgody",
    "statute": {
      "accept": "Akceptuję",
      "statute": "regulamin",
      "and": "oraz",
      "privacyPolicy": "politykę prywatności"
    },
    "statuteText": "Akceptuję regulamin oraz politykę prywatności."
  },
  "en": {
    "acceptAllText": "I accept all consents",
    "statute": {
      "accept": "I accept",
      "statute": "the terms and conditions",
      "and": "and",
      "privacyPolicy": "privacy policy"
    },
    "statuteText": "I accept the terms and conditions and privacy policy."
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'
import { useCeneo } from '~/composables/useCeneo'
import { useConfigStore } from '~/store/config'

defineProps<{
  disabled?: boolean
}>()

const t = useLocalI18n()

const config = useConfigStore()
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

const statuteUrl = computed(() => config.env.statute_url?.toString() ?? 'regulamin')
const privacyPolicyUrl = computed(
  () => config.env.privacy_policy_url?.toString() ?? 'polityka-prywatnosci',
)
</script>

<style lang="scss" scoped>
.checkout-consents {
  font-size: rem(10);

  &__indented {
    margin-left: 24px;
  }
}
</style>
