<template>
  <form @submit.prevent="onSubmit">
    <FormCheckbox
      v-for="consent in consents"
      :key="consent.id"
      v-model:model-value="form.values[consent.id]"
      :name="consent.name"
      :rules="consent.required ? 'required' : ''"
      :disabled="value[consent.id] && consent.required && forceRequired"
      @update:model-value="(v) => setConsentValue(consent.id, v)"
    >
      <BaseWysiwygContent :content="consent.description_html" />
    </FormCheckbox>

    <LayoutButton v-if="showSaveBtn" :label="t('saveConsent')" html-type="submit" />
  </form>

  <LayoutInfoBox v-if="errorMessage" type="danger">
    {{ errorMessage }}
  </LayoutInfoBox>
</template>

<i18n lang="json">
{
  "pl": {
    "saveConsent": "Zapisz zgody"
  }
}
</i18n>

<script setup lang="ts">
import { UserConsentDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'
const t = useLocalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()

const errorMessage = ref('')

const props = defineProps<{
  value: UserConsentDto
  forceRequired?: boolean
  showSaveBtn?: boolean
}>()

const emit = defineEmits<{
  (e: 'error', error: any): void
  (e: 'update:value', value: UserConsentDto): void
  (e: 'submit', value: UserConsentDto): void
}>()

const setConsentValue = (consentId: string, value: boolean) => {
  emit('update:value', { ...form.values, [consentId]: value })
}

const { data: consents } = useAsyncData('consents', async () => {
  try {
    const consents = await heseya.Consents.get()
    return consents.data
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})

const form = useForm({
  initialValues: {},
})

const onSubmit = form.handleSubmit(() => {
  try {
    emit('submit', form.values)
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})

watch(
  () => props.value,
  () => {
    form.values = props.value
  },
)
</script>
