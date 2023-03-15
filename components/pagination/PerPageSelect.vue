<template>
  <div class="per-page-select">
    <div class="per-page-select__text">{{ t('text') }}</div>

    <select v-model="innerValue" name="perPage" class="per-page-select__input">
      <option :value="12">12</option>
      <option :value="24">24</option>
      <option :value="48">48</option>
      <option :value="96">96</option>
    </select>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "text": "Pokaż na stronie"
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
  }

  &__input {
    all: unset;
    background-color: $gray-color-300;
    border-radius: 5px;
    padding: 11px 14px;
    padding-right: 32px;
    background-image: url('@/assets/icons/arrow-drop-down.svg');
    background-repeat: no-repeat;
    background-position: right 15px center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: $gray-color-400;
    }
  }
}
</style>
