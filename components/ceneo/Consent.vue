<template>
  <FormCheckbox v-model="value" class="ceneo-consent" name="ceneo-consent" :disabled="disabled">
    {{ t('text') }}
  </FormCheckbox>
</template>

<i18n lang="json">
{
  "pl": {
    "text": "Chcę otrzymywać ankiety od Ceneo w wiadomości email."
  },
  "en": {
    "text": "I want to receive inquiries Ceneo in an e-mail."
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

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
.ceneo-consent {
}
</style>
