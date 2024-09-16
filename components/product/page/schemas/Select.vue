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
      <template v-if="getDisplayedPrice(option.price).value > 0">
        (+{{ formatAmount(getDisplayedPrice(option.price).value, currency) }})
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
import type { Schema } from '@heseya/store-core'
import isNull from 'lodash/isNull'
import { useGetDisplayedPrice } from '~/composables/useGetDisplayedPrice'

const t = useLocalI18n()
const currency = useCurrency()
const { getDisplayedPrice } = useGetDisplayedPrice()

const props = withDefaults(
  defineProps<{
    schema: Schema
    value: string | null
  }>(),
  {
    value: null,
  },
)

const emit = defineEmits<{
  (e: 'update:value', value: string | null): void
}>()

const innerValue = computed({
  get: () => (isNull(props.value) ? undefined : props.value),
  set: (v) => emit('update:value', !v ? null : v),
})
</script>

<style lang="scss" scoped>
.schema-select {
}
</style>
