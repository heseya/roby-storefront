<template>
  <div class="product-schemas">
    <FormSelect
      v-for="schema in shownSchemas"
      :key="schema.id"
      class="product-schemas__schema"
      :name="schema.id"
      :model-value="getValue(schema.id)"
      :label="schema.name"
      @update:model-value="(v) => setValue(schema.id, v)"
    >
      <option
        v-for="option in schema.options"
        :key="option.id"
        :value="option.id"
        :disabled="option.disabled"
        class="product-schemas__option"
      >
        {{ option.name }}
        <span v-if="option.price > 0"> (+{{ formatAmount(option.price) }}) </span>
      </option>
    </FormSelect>
  </div>
</template>

<script setup lang="ts">
import { CartItemSchema, Product, SchemaType } from '@heseya/store-core'

const props = defineProps<{
  product: Product
  value: CartItemSchema[]
}>()

const emit = defineEmits<{
  (e: 'update:value', value: CartItemSchema[]): void
}>()

// TODO: support more schemas
const shownSchemas = computed(() =>
  props.product.schemas.filter((schema) => schema.type === SchemaType.Select),
)

const getValue = (schemaId: string) => {
  return props.value.find((schema) => schema.id === schemaId)?.value
}

const setValue = (schemaId: string, value: any) => {
  const schema = props.value.find((schema) => schema.id === schemaId)
  if (!schema) {
    // eslint-disable-next-line no-console
    console.warn(`Schema with id ${schemaId} not found`)
    return
  }

  schema.value = value

  emit('update:value', props.value)
}
</script>

<style lang="scss" scoped>
.product-schemas {
  &__schema {
    margin-bottom: 1rem;
  }

  &__option {
  }

  &__option-price {
    color: var(--primary-color);
    font-weight: 500;
  }
}
</style>
