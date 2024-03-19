<template>
  <FormCheckbox
    v-show="enabled"
    v-model="value"
    :disabled="disabled"
    class="newsletter-consent"
    name="newsletter-consent"
  >
    {{ t('consent.text1', { name: companyName }) }}
    <a class="primary-text" :href="localePath('/regulamin')" target="_blank">
      {{ t('consent.statute') }} </a
    >{{ t('consent.text2') }}
  </FormCheckbox>
</template>

<i18n lang="json">
{
  "pl": {
    "consent": {
      "text1": "Chcę otrzymywać od {name}, zgodnie z ",
      "statute": "regulaminem",
      "text2": ", informacje handlowe dot. produktów {name} na adres e-mail i w związku z tym wyrażam zgodę na przesyłanie takich informacji."
    }
  },
  "en": {
    "consent": {
      "text1": "I want to receive personalized commercial information about {name} products from {name}, in accordance with the ",
      "statute": "regulations",
      "text2": ", to the e-mail address and therefore I agree to send such information."
    }
  }
}
</i18n>

<script setup lang="ts">
import { useConfigStore } from '~/store/config'

const t = useLocalI18n()

const { enabled } = useNewsletter()
const localePath = useLocalePath()

const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const config = useConfigStore()

const companyName = computed(() => config.env.company_name)

const value = computed({
  get(): boolean {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss" scoped>
.newsletter-consent {
}
</style>
