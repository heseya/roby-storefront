<template>
  <FormSelect
    v-model="innerValue"
    label-uppercase
    :label="hideLabel ? undefined : t('label')"
    name="sort"
    type="gray"
  >
    <option :value="undefined">{{ t('options.default') }}</option>
    <option value="price:asc">{{ t('options.price_asc') }}</option>
    <option value="price:desc">{{ t('options.price_desc') }}</option>
    <option value="name">{{ t('options.name') }}</option>
  </FormSelect>
</template>

<i18n lang="json">
{
  "pl": {
    "label": "Sortuj według",
    "options": {
      "default": "Domyślnie",
      "price_asc": "Od najtańszych",
      "price_desc": "Od najdroższych",
      "name": "Wg nazwy"
    }
  },
  "en": {
    "label": "Sort by",
    "options": {
      "default": "Default",
      "price_asc": "From the cheapest",
      "price_desc": "From the most expensive",
      "name": "By name"
    }
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const props = defineProps<{
  modelValue?: string
  hideLabel?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
