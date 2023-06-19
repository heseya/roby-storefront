<template>
  <form @submit.prevent="onSubmit">
    <AccountConsentsList v-model:value="form.values" :force-required="forceRequired" />
    <LayoutButton :label="t('saveConsent')" html-type="submit" />
  </form>

  <LayoutInfoBox v-if="errorMessage" type="danger">
    {{ errorMessage }}
  </LayoutInfoBox>
</template>

<i18n lang="json">
{
  "pl": {
    "saveConsent": "Zapisz zgody"
  },
  "en": {
    "saveConsent": "Save consent"
  }
}
</i18n>

<script setup lang="ts">
import { UserConsentDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const formatError = useErrorMessage()

const props = defineProps<{
  value: UserConsentDto
  forceRequired?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', value: UserConsentDto): void
  (e: 'submit', value: UserConsentDto): void
}>()

const errorMessage = ref('')
const form = useForm<UserConsentDto>({
  initialValues: { ...props.value },
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
    form.values = { ...props.value }
  },
)
</script>
