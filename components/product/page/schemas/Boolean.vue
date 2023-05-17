<template>
  <FormCheckbox v-model="innerValue" class="schema-boolean" :name="schema.id">
    {{ schema.name }}
    <span v-if="schema.price > 0" class="schema-boolean__price">
      (+{{ formatAmount(schema.price) }})
    </span>
  </FormCheckbox>
</template>

<script setup lang="ts">
import { CartItemSchemaValue, Schema, SchemaType } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    schema: Schema & { type: SchemaType.Boolean }
    value?: CartItemSchemaValue
  }>(),
  {
    value: undefined,
  },
)

if (props.schema.type !== SchemaType.Boolean) {
  throw new Error('Schema type must be boolean')
}

const emit = defineEmits<{
  (e: 'update:value', value: CartItemSchemaValue | undefined): void
}>()

const innerValue = computed({
  get: () => props.value as boolean,
  set: (v: boolean) => emit('update:value', v),
})
</script>

<style lang="scss" scoped>
.schema-boolean {
  &__price {
    color: var(--secondary-color);
    font-weight: 600;
  }
}
</style>
