<template>
  <FormCheckbox
    v-for="consent in consents"
    :key="consent.id"
    :model-value="userConsents[consent.id] || false"
    :name="consent.name"
    :rules="consent.required ? 'required' : ''"
    :disabled="consent.required && disabledAcceptedRequiredConsents"
    @update:model-value="(v) => setConsentValue(consent.id, v)"
  >
    <span v-html="consent.description_html"></span>
  </FormCheckbox>
</template>

<script setup lang="ts">
import { UserConsentDto } from '@heseya/store-core'
const heseya = useHeseya()

const props = defineProps<{
  userConsents: UserConsentDto
  disabledAcceptedRequiredConsents?: boolean
}>()

const emit = defineEmits<{
  (e: 'error', error: any): void
  (e: 'update:userConsents', value: UserConsentDto): void
}>()

const { data: consents } = useAsyncData('consents', async () => {
  try {
    const consents = await heseya.Consents.get()
    return consents.data
  } catch (e: any) {
    emit('error', e)
  }
})

const setConsentValue = (consentId: string, value: boolean) => {
  emit('update:userConsents', { ...props.userConsents, [consentId]: value })
}
</script>
