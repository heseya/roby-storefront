<template>
  <FormSelect
    v-model="innerValue"
    label-uppercase
    :label="hideLabel ? undefined : t('label')"
    name="sort"
    type="gray"
  >
    <option :value="undefined">{{ t('options.default') }}</option>
    <option :value="`price:${currency}:asc`">{{ t('options.price_asc') }}</option>
    <option :value="`price:${currency}:desc`">{{ t('options.price_desc') }}</option>
    <option value="name">{{ t('options.name') }}</option>
    <option v-for="{ key, label } in sortable" :key="key" :value="key">
      {{ label }}
    </option>
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
      "name": "Wg nazwy",
      "by": "Wg",
      "asc": "(rosnąco)",
      "desc": "(malejąco)"
    }
  },
  "en": {
    "label": "Sort by",
    "options": {
      "default": "Default",
      "price_asc": "From the cheapest",
      "price_desc": "From the most expensive",
      "name": "By name",
      "by": "By",
      "asc": "(asc)",
      "desc": "(desc)"
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

const currency = useCurrency()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

const { data: sortableAttributes } = useAsyncData(async () => {
  const heseya = useHeseya()
  // TODO: API should allow to filter on db level
  const { data } = await heseya.Attributes.get()
  return data.filter((attribute) => attribute.sortable)
})

const sortable = computed(
  () =>
    sortableAttributes.value
      ?.map(function (attr) {
        const keyBase = `attribute.${attr.id}`
        const labelBase = `${t('options.by')} ${attr.name.toLocaleLowerCase()}`
        return [
          { key: `${keyBase}:desc`, label: `${labelBase} ${t('options.desc')}` },
          { key: `${keyBase}:asc`, label: `${labelBase} ${t('options.asc')}` },
        ]
      })
      .flat() || [],
)

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

onMounted(() => {
  // Change sort currency when currency changes
  if (innerValue.value?.startsWith('price:')) innerValue.value = `price:${currency.value}:asc`
})
</script>
