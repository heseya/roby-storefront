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
      <FormInputLabel> {{ t('price') }} </FormInputLabel>

      <div class="product-filters__row">
        <span> {{ t('from') }} </span>
        <FormInput
          type="gray"
          html-type="number"
          name="price_min"
          :model-value="filters['price.min']"
          postfix="zł"
          @update:model-value="(v) => updateKey('price.min', v)"
        />
        <span> {{ t('to') }} </span>
        <FormInput
          type="gray"
          html-type="number"
          name="price_max"
          postfix="zł"
          :model-value="filters['price.max']"
          @update:model-value="(v) => updateKey('price.max', v)"
        />
      </div>
    </div>

    <ProductFiltersCheckboxGroup
      v-for="attribute in attributes || []"
      :key="attribute.id"
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
    "price": "Cena",
    "from": "Od",
    "to": "do"
  }
}
</i18n>

<script setup lang="ts">
import { AttributeType } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    hideSort?: boolean
    filters?: Record<string, any>
  }>(),
  {
    hideSort: false,
    filters: () => ({}),
  },
)
const emit = defineEmits<{
  (event: 'update:filters', filters: Record<string, any>): void
}>()

const heseya = useHeseya()
const t = useLocalI18n()

const { data: attributes } = useAsyncData(async () => {
  // TODO: add support for date and number attributes
  // TODO: extract sets from filters
  const attrs = await heseya.Products.getFilters({ sets: [] })
  return attrs.filter(
    (a) => a.type === AttributeType.MultiChoiceOption || a.type === AttributeType.SingleOption,
  )
})

const updateKey = (key: string, value: any) => {
  emit('update:filters', { ...props.filters, [key]: value })
}
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
