<template>
  <div class="product-filters">
    <h3 class="product-filters__title">Filtry</h3>

    <div class="product-filters__section">
      <ProductSortSelect
        v-if="!hideSort"
        :model-value="filters.sort"
        @update:model-value="(v) => updateKey('sort', v)"
      />
    </div>

    <div class="product-filters__section">
      <FormInputLabel>Cena</FormInputLabel>

      <div class="product-filters__row">
        <span>Od</span>
        <FormInput
          type="gray"
          html-type="number"
          :model-value="filters['price.min']"
          postfix="zł"
          @update:model-value="(v) => updateKey('price.min', v)"
        />
        <span>do</span>
        <FormInput
          type="gray"
          html-type="number"
          :model-value="filters['price.max']"
          postfix="zł"
          @update:model-value="(v) => updateKey('price.max', v)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
