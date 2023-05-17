<template>
  <FormSelect v-model="innerValue" class="schema-select" :name="schema.id" :label="schema.name">
    <option
      v-for="option in schema.options"
      :key="option.id"
      :value="option.id"
      :disabled="option.disabled || !option.available"
      class="schema-select__option"
    >
      {{ option.name }}
      <template v-if="option.price > 0"> (+{{ formatAmount(option.price) }}) </template>
    </option>
  </FormSelect>
</template>

<script setup lang="ts">
import { CartItemSchemaValue, Schema, SchemaType } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    schema: Schema & { type: SchemaType.Select }
    value?: CartItemSchemaValue
  }>(),
  {
    value: undefined,
  },
)

if (props.schema.type !== SchemaType.Select) {
  throw new Error('Schema type must be select')
}

const emit = defineEmits<{
  (e: 'update:value', value: CartItemSchemaValue | undefined): void
}>()

const innerValue = computed({
  get: () => props.value,
  set: (v) => emit('update:value', v),
})
</script>

<style lang="scss" scoped>
.schema-select {
}
</style>
