<template>
  <div class="quantity-input">
    <div v-if="showLabel" class="quantity-input__label">{{ $t('cart.quantity') }}</div>
    <FormSelect
      :model-value="quantity"
      label-uppercase
      name="quantity"
      :disabled="disabled"
      class="quantity-input__quantity"
      @update:model-value="(v) => emit('update:quantity', Number(v))"
    >
      <option v-for="q in values" :key="q" :value="q">{{ q }}</option>
    </FormSelect>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    quantity: number
    showLabel?: boolean
    disabled?: boolean
  }>(),
  {
    quantity: 1,
    showLabel: false,
    disabled: false,
  },
)

const $t = useGlobalI18n()

const emit = defineEmits<{
  (event: 'update:quantity', value: number): void
}>()

const values = computed(() => {
  const quantities = Array.from({ length: 11 }, (_, i) => props.quantity + i - 5).filter(
    (v) => v > 0,
  )
  if (!quantities.includes(1)) quantities.unshift(1)
  return quantities
})
</script>

<style lang="scss" scoped>
.quantity-input {
  display: flex;
  align-items: center;
  gap: 6px;

  &__label {
    font-size: rem(14);
  }

  &__select {
    width: 100px;
  }
}
</style>
