<template>
  <div
    class="input"
    :class="[`input--${type}`, !!errors.length && `input--error`, postfix && 'input--postfix']"
    :data-postfix="postfix"
  >
    <LazyFormInputLabel v-if="label" :uppercase="labelUppercase" class="input__label" :for="id">
      {{ label }} <span v-if="isRequired && label" class="input__required-star">*</span>
    </LazyFormInputLabel>
    <div class="input__content">
      <input
        :id="id"
        v-model="inputValue"
        class="input__input"
        :class="{ 'input__input--disabled': disabled }"
        :type="htmlType"
        :autocomplete="autocomplete"
        :name="name"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        :disabled="disabled"
        :inputmode="htmlType === 'phone' ? 'tel' : undefined"
        @keydown.stop
      />
      <slot></slot>
    </div>
    <span class="input__error">{{ errorMessage || errors[0] }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'gray'
    htmlType?: string
    autocomplete?: string
    placeholder?: string
    name: string
    label?: string
    postfix?: string
    errorMessage?: string
    modelValue?: string | number
    max?: number
    min?: number
    rules?: string
    labelUppercase?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'default',
    htmlType: 'text',
    name: '',
    placeholder: '',
    label: '',
    postfix: '',
    errorMessage: '',
    modelValue: '',
    rules: '',
    max: undefined,
    min: undefined,
    autocomplete: undefined,
    labelUppercase: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
}>()

// TODO: maybe use useId() in the future?
const id = computed(() => props.name)
const isRequired = computed(() => props.rules.includes('required'))

const { errors, validate } = useField(props.name, props.rules, {
  /**
   * We need to force validation to ignore auto form update, cause we are doing it manually
   */
  validateOnValueUpdate: false,
})

const inputValue = computed({
  get(): number | string {
    return props.modelValue
  },
  set(value: number | string) {
    emit('update:modelValue', value)
  },
})

watch(
  () => props.modelValue,
  () => validate(),
)
</script>
