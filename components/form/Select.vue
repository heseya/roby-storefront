<template>
  <div class="input input--select" :class="`input--${type}`">
    <FormInputLabel v-if="label" :uppercase="labelUppercase" :for="name" class="input__label">
      {{ label }}
    </FormInputLabel>
    <select
      :id="name"
      v-model="innerValue"
      :name="name"
      class="input__input"
      :class="{ 'input__input--disabled': disabled }"
      :disabled="disabled"
    >
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
type SelectValue = number | string | undefined | null | boolean | object

const props = withDefaults(
  defineProps<{
    modelValue?: SelectValue
    name: string
    label?: string
    type?: 'default' | 'gray'
    disabled?: boolean
    labelUppercase?: boolean
  }>(),
  {
    modelValue: undefined,
    label: '',
    type: 'default',
    disabled: false,
    labelUppercase: false,
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
