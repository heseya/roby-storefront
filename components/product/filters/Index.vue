<template>
  <div class="product-filters">
    <h3 class="product-filters__title">{{ t('title') }}</h3>

    <div class="product-filters__section">
      <ProductSortSelect
        v-if="!hideSort"
        :model-value="filters.sort"
        @update:model-value="(v) => updateKey('sort', v)"
      />
    </div>

    <div class="product-filters__section">
      <FormInputLabel label-uppercase> {{ t('price') }} </FormInputLabel>

      <div class="product-filters__row">
        <span> {{ $t('common.from') }} </span>
        <FormInput
          type="gray"
          html-type="number"
          name="price_min"
          :model-value="filters['price.min']"
          :postfix="currency"
          label-uppercase
          @update:model-value="(v) => updatePrice('min', v)"
        />
        <span> {{ $t('common.to') }} </span>
        <FormInput
          type="gray"
          html-type="number"
          name="price_max"
          :postfix="currency"
          :model-value="filters['price.max']"
          label-uppercase
          @update:model-value="(v) => updatePrice('max', v)"
        />
      </div>
    </div>

    <div v-for="attribute in numberAttributes" :key="attribute.id" class="product-filters__section">
      <FormInputLabel label-uppercase> {{ attribute.name }} </FormInputLabel>

      <div class="product-filters__row">
        <span> {{ $t('common.from') }} </span>
        <FormInput
          type="gray"
          html-type="number"
          :name="`attribute_${attribute.slug}_min`"
          :model-value="filters[`attribute.${attribute.slug}.min`]"
          label-uppercase
          @update:model-value="(v) => updateKey(`attribute.${attribute.slug}.min`, v)"
        />
        <span> {{ $t('common.to') }} </span>
        <FormInput
          type="gray"
          html-type="number"
          :name="`attribute_${attribute.slug}_min`"
          :model-value="filters[`attribute.${attribute.slug}.max`]"
          label-uppercase
          @update:model-value="(v) => updateKey(`attribute.${attribute.slug}.max`, v)"
        />
      </div>
    </div>

    <ProductFiltersCheckboxGroup
      v-for="attribute in optionAttributes"
      :key="attribute.id"
      class="product-filters__section"
      :attribute="attribute"
      :value="filters[`attribute.${attribute.slug}`]"
      @update:value="(v) => updateKey(`attribute.${attribute.slug}`, v)"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Filtry",
    "price": "Cena"
  },
  "en": {
    "title": "Filters",
    "price": "Price"
  }
}
</i18n>

<script setup lang="ts">
import { AttributeType } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    hideSort?: boolean
    filters?: Record<string, any>
    sets: string[]
  }>(),
  {
    hideSort: false,
    filters: () => ({}),
    sets: () => [],
  },
)
const emit = defineEmits<{
  (event: 'update:filters', filters: Record<string, any>): void
}>()

const currency = useCurrency()

const heseya = useHeseya()
const t = useLocalI18n()
const $t = useGlobalI18n()

const { data: attributes } = useLazyAsyncData(async () => {
  // TODO: this is not optimal
  const sets = await Promise.all(props.sets.map((set) => heseya.ProductSets.getOneBySlug(set)))

  return heseya.Products.getFilters({ sets: sets.map((s) => s.id) })
})

const optionAttributes = computed(
  () =>
    attributes.value?.filter(
      (a) => a.type === AttributeType.MultiChoiceOption || a.type === AttributeType.SingleOption,
    ) || [],
)

const numberAttributes = computed(
  () => attributes.value?.filter((a) => a.type === AttributeType.Number) || [],
)

// TODO: add support for date attributes
// const dateAttributes = computed(
//   () => attributes.value?.filter((a) => a.type === AttributeType.Date) || [],
// )

const updateKey = (key: string, value: any) => {
  emit('update:filters', { ...props.filters, [key]: value })
}

const updatePrice = (key: 'max' | 'min', value: any) => {
  const data: Record<string, any> = { ...props.filters }
  data[`price.${key}`] = value

  if (data[`price.min`] || data[`price.max`]) data[`price.currency`] = currency.value
  else data[`price.currency`] = undefined

  emit('update:filters', data)
}

watch(currency, () => {
  if (props.filters[`price.currency`]) updateKey('price.currency', currency.value)
})
</script>

<style lang="scss" scoped>
.product-filters {
  &__title {
    font-size: rem(20);
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: rem(8);
  }

  &__section {
    margin-bottom: 25px;
  }
}
</style>
