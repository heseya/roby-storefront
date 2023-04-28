<template>
  <div
    class="input"
    :class="[`input--${type}`, !!errors.length && `input--error`, postfix && 'input--postfix']"
    :data-postfix="postfix"
  >
    <FormInputLabel v-if="label" :uppercase="labelUppercase" class="input__label" :for="id">
      {{ label }} <span v-if="isRequired && label" class="input__required-star">*</span>
    </FormInputLabel>
    <div class="input__content">
      <textarea
        :id="id"
        v-model="inputValue"
        class="input__input"
        :autocomplete="autocomplete"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :cols="cols"
        :rows="rows"
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
    autocomplete?: string
    placeholder?: string
    rows?: number
    cols?: number
    name: string
    label?: string
    postfix?: string
    errorMessage?: string
    modelValue?: string | number
    rules?: string
    labelUppercase?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'default',
    name: '',
    placeholder: '',
    label: '',
    postfix: '',
    errorMessage: '',
    modelValue: '',
    rules: '',
    rows: undefined,
    cols: undefined,
    autocomplete: undefined,
    labelUppercase: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
}>()

const uuid = Math.random().toString(36).substr(2, 9)

const id = computed(() => `${props.name}-${uuid}`)

const { errors } = useField(props.name, props.rules)

const inputValue = computed({
  get(): number | string {
    return props.modelValue
  },
  set(value: number | string) {
    emit('update:modelValue', value)
  },
})

const isRequired = computed(() => props.rules.includes('required'))
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/input.scss';
</style>
