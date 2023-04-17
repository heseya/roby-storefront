<template>
  <div class="input input--select" :class="`input--${type}`">
    <FormInputLabel v-if="label" uppercase :for="name" class="input__label">
      {{ label }}
    </FormInputLabel>
    <select :id="name" v-model="innerValue" :name="name" class="input__input">
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
type SelectValue = number | string | undefined | null

const props = withDefaults(
  defineProps<{
    modelValue?: SelectValue
    name: string
    label?: string
    type?: 'default' | 'gray'
  }>(),
  {
    modelValue: undefined,
    label: '',
    type: 'default',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectValue): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/input.scss';
</style>
