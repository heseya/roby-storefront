<template>
  <div class="filter-checkbox-group">
    <FormInputLabel class="filter-checkbox-group__label">{{ attribute.name }}</FormInputLabel>

    <FormCheckbox
      v-for="option in options"
      :key="option.id"
      :model-value="isChecked(option.id)"
      class="filter-checkbox-group__checkbox"
      :name="option.id"
      @update:model-value="() => toggleCheckbox(option.id)"
    >
      {{ option.name }}
    </FormCheckbox>
  </div>
</template>

<script setup lang="ts">
import { Attribute } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    attribute: Attribute
    value?: string[] | string
  }>(),
  {
    value: () => [],
  },
)
const emit = defineEmits<{
  (e: 'update:value', value: string[]): void
}>()

const heseya = useHeseya()

const { data: options } = useAsyncData(async () => {
  const { data } = await heseya.Attributes.getOptions(props.attribute.id)
  return data
})

const value = computed(() => (Array.isArray(props.value) ? props.value : [props.value]))

const isChecked = (optionId: string) => value.value.includes(optionId)

const toggleCheckbox = (optionId: string) => {
  const newValue = isChecked(optionId)
    ? value.value.filter((v) => v !== optionId)
    : [...value.value, optionId]
  emit('update:value', newValue.filter(Boolean))
}
</script>

<style lang="scss" scoped></style>
