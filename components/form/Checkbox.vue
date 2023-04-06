<template>
  <div class="checkbox" :class="{ 'checkbox--error': error }" :disabled="disabled">
    <input :id="name" v-model="checkboxValue" type="checkbox" :disabled="disabled" />
    <label tabindex="0" :for="name">
      <span class="checkbox__label">
        <slot name="default">{{ label }}</slot>
      </span>
      <span class="checkbox__text">
        <slot name="text">{{ text }}</slot>
      </span>
    </label>
    <span class="checkbox__error">{{ errors[0] || error }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    text?: string
    modelValue: boolean
    disabled?: boolean
    error?: string
    rules?: string
  }>(),
  {
    label: '',
    text: '',
    disabled: false,
    error: '',
    rules: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const { errors } = useField(props.name, props.rules)

const checkboxValue = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss" scoped>
.checkbox {
  margin: 12px 0;
  text-align: left;

  input {
    display: none;
  }

  &__label {
    display: block;
    font-size: rem(14);
    line-height: rem(14);
  }

  &__text {
    display: block;
    font-size: rem(12);
    line-height: rem(14);

    &:not(:empty) {
      margin-top: 8px;
    }
  }

  label {
    padding-left: 24px;
    display: block;
    font-weight: 400;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0px;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      display: block;
      border: solid 1px $gray-color-400;
      background-position: 45% 60%;
      background-size: 60%;
      background-repeat: no-repeat;
      background-color: #fff;
      transition: 0.3s;
      cursor: pointer;
    }

    a {
      font-weight: 600;
      color: var(--secondary-color-alt);
    }
  }

  input:checked + label::before {
    background-color: var(--secondary-color-alt);
    background-image: url('@/assets/icons/check.svg');
    border-color: var(--secondary-color-alt);
  }

  &[disabled='true'] label::before {
    opacity: 0.6;
    background-color: $unnamed-color-f4f8fc;
    cursor: not-allowed;
  }

  &__error {
    font-size: rem(10);
    color: $error-color;
    padding-left: 24px;
    font-weight: 500;

    &:empty {
      display: none;
    }
  }

  &--error label::before {
    border-color: $error-color;
  }
  &--error label {
    color: $error-color;
  }
}
</style>
