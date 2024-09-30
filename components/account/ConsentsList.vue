<template>
  <div class="consents-list">
    <FormCheckbox
      v-for="consent in consents"
      :key="consent.id"
      :model-value="value[consent.id] || false"
      :name="consent.id"
      :rules="consent.required ? 'required' : ''"
      :disabled="value[consent.id] && consent.required && forceRequired"
      @update:model-value="(v) => setConsentValue(consent.id, v)"
    >
      <BaseWysiwygContent :content="consent.description_html" />
    </FormCheckbox>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { UserConsentDto } from '@heseya/store-core'
import { ConsentType } from '@heseya/store-core'

const heseya = useHeseya()

const props = withDefaults(
  defineProps<{
    value: UserConsentDto
    forceRequired?: boolean
    type?: ConsentType
  }>(),
  {
    type: ConsentType.User,
    forceRequired: false,
  },
)

const emit = defineEmits<{
  (e: 'error', error: any): void
  (e: 'update:value', value: UserConsentDto): void
}>()

const setConsentValue = (consentId: string, value: boolean) => {
  emit('update:value', { ...props.value, [consentId]: value })
}

const organization = useOrganization()

const { data: consents } = useAsyncData('consents', async () => {
  try {
    const { data } = await heseya.Consents.get({
      lang_fallback: 'any',
      type: organization.value?.id ? ConsentType.Organization : props.type,
    })

    return data
  } catch (e: any) {
    emit('error', e)
  }
})
</script>
