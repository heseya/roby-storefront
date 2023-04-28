<template>
  <div class="product-schemas">
    <ProductPageSchemasSelect
      v-for="schema in shownSchemas"
      :key="schema.id"
      class="product-schemas__schema"
      :schema="schema"
      :value="getValue(schema.id)"
      @update:value="(v) => setValue(schema.id, v)"
    />
  </div>
</template>

<script setup lang="ts">
import { CartItemSchema, Product, Schema, SchemaType } from '@heseya/store-core'

const props = defineProps<{
  product: Product
  value: CartItemSchema[]
}>()

const emit = defineEmits<{
  (e: 'update:value', value: CartItemSchema[]): void
}>()

// TODO: support more schemas
const shownSchemas = computed(
  () =>
    props.product.schemas.filter((schema) => schema.type === SchemaType.Select) as (Schema & {
      type: SchemaType.Select
    })[],
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
