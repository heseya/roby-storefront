<template>
  <div class="product-filters">
    <h3>Filtry</h3>

    <ProductSortSelect
      v-if="!hideSort"
      :model-value="filters.sort"
      @update:model-value="(v) => updateKey('sort', v)"
    />
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

<style lang="scss" scoped></style>
