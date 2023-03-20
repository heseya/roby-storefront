<template>
  <div
    class="input"
    :class="[`input--${type}`, !!errors.length && `input--error`, postfix && 'input--postfix']"
    :data-postfix="postfix"
  >
    <FormInputLabel v-if="label" class="input__label" :for="id">{{ label }}</FormInputLabel>
    <input
      :id="id"
      v-model="inputValue"
      class="input__input"
      :type="htmlType"
      :autocomplete="autocomplete"
      :name="name"
      placeholder=" "
      @keydown.stop
    />
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
    name: string
    label?: string
    postfix?: string
    errorMessage?: string
    modelValue?: string | number
    rules?: string
  }>(),
  {
    type: 'default',
    htmlType: 'text',
    name: '',
    label: '',
    postfix: '',
    errorMessage: '',
    modelValue: '',
    rules: '',
    autocomplete: undefined,
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
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/input.scss';
</style>
