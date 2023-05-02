<template>
  <div>
    <FormCheckbox
      v-for="consent in consents"
      :key="consent.id"
      :model-value="userConsentsDto[consent.id] || false"
      :name="consent.name"
      :rules="consent.required ? 'required' : ''"
      :disabled="userConsentsDto[consent.id] && consent.required && forceRequired"
      @update:model-value="(v) => setConsentValue(consent.id, v)"
    >
      <span v-html="consent.description_html"></span>
    </FormCheckbox>

    <LayoutButton
      v-if="!onlyAcceptedRequiredConsents() && save && consents?.length"
      @click="emit('save:consents')"
    >
      {{ t('saveConsent') }}
    </LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "saveConsent": "Zapisz zgody"
  }
}
</i18n>

<script setup lang="ts">
import { UserConsent, UserConsentDto } from '@heseya/store-core'
const t = useLocalI18n()
const heseya = useHeseya()

const props = defineProps<{
  userConsentsDto: UserConsentDto
  userConsents?: UserConsent[]
  forceRequired?: boolean
  save?: boolean
}>()

const emit = defineEmits<{
  (e: 'error', error: any): void
  (e: 'update:userConsentsDto', value: UserConsentDto): void
  (e: 'save:consents'): void
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
  emit('update:userConsentsDto', { ...props.userConsentsDto, [consentId]: value })
}

const onlyAcceptedRequiredConsents = (): boolean => {
  // Check if the user has all consents added
  if (props.userConsents?.length !== consents.value?.length) {
    return false
  }

  // Check if the user has other consents than required
  if (consents.value?.filter((consent) => consent.required).length !== consents.value?.length) {
    return false
  }

  // Return true if user consents are only required and accepted
  return props.userConsents?.filter(({ value }) => value).length === consents.value?.length
}
</script>
