<template>
  <div class="per-page-select">
    <div class="per-page-select__text">{{ t('text') }}</div>

    <FormSelect
      v-model="innerValue"
      label-uppercase
      name="perPage"
      class="per-page-select__input"
      type="gray"
    >
      <option :value="12">12</option>
      <option :value="24">24</option>
      <option :value="48">48</option>
      <option :value="96">96</option>
    </FormSelect>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "text": "Pokaż na stronie"
  },
  "en": {
    "text": "Show on page"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style lang="scss" scoped>
.per-page-select {
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: rem(14);
    margin-right: 8px;
    white-space: nowrap;
  }

  &__input {
    max-width: 70px;
  }
}
</style>
