<template>
  <FormSelect
    v-model="innerValue"
    class="schema-select"
    :name="schema.id"
    :label="schema.name"
    :rules="schema.required ? 'required' : ''"
  >
    <option v-if="!schema.required" :value="undefined" class="schema-select__option">
      {{ t('emptyValue') }}
    </option>
    <option
      v-for="option in schema.options"
      :key="option.id"
      :value="option.id"
      class="schema-select__option"
    >
      {{ option.name }}
      <template v-if="parsePrices(option.prices, currency) > 0">
        (+{{ calculateOptionPrice(parsePrices(option.prices, currency)) }})
      </template>
    </option>
  </FormSelect>
</template>

<i18n lang="json">
{
  "pl": {
    "emptyValue": "-- Wybierz opcję --"
  },
  "en": {
    "emptyValue": "-- Select --"
  }
}
</i18n>

<script setup lang="ts">
import { SchemaType, parsePrices } from '@heseya/store-core'
import type { CartItemSchemaValue, Schema } from '@heseya/store-core'

const t = useLocalI18n()
const currency = useCurrency()

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

const priceGross = usePriceGross()

const calculateOptionPrice = (price: number) => {
  const priceWithVat = priceGross(
    [{ net: price.toString(), gross: price.toString(), currency: currency.value }],
    currency.value,
  )
  return formatAmount(priceWithVat, currency.value)
}
</script>

<style lang="scss" scoped>
.schema-select {
}
</style>
