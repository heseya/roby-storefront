<template>
  <FormCheckbox v-model="value" class="newsletter-consent" name="newsletter-consent">
    {{ t('text') }}
  </FormCheckbox>
</template>

<i18n lang="json">
{
  "pl": {
    "text": "Chcę otrzymywać inforacje o aktualnych ofertach oraz promocjach w wiadomości email."
  },
  "en": {
    "text": "I want to receive information about current offers and promotions in an e-mail."
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const props = defineProps<{
  modelValue: boolean
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
.newsletter-consent {
}
</style>
