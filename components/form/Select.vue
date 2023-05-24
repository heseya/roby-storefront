<template>
  <div class="input input--select" :class="`input--${type}`">
    <FormInputLabel v-if="label" :uppercase="labelUppercase" :for="name" class="input__label">
      {{ label }} <span v-if="isRequired && label" class="input__required-star">*</span>
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
    <span class="input__error">{{ errorMessage || errors[0] }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

type SelectValue = number | string | undefined | null | boolean | object

const props = withDefaults(
  defineProps<{
    modelValue?: SelectValue
    name: string
    label?: string
    type?: 'default' | 'gray'
    disabled?: boolean
    labelUppercase?: boolean
    rules: string
    errorMessage?: string
  }>(),
  {
    modelValue: undefined,
    label: '',
    type: 'default',
    disabled: false,
    labelUppercase: false,
    rules: '',
    errorMessage: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectValue): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { errors } = useField(props.name, props.rules)

const isRequired = computed(() => props.rules.includes('required'))
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/input.scss';
</style>
