<template>
  <div class="checkbox" :class="{ 'checkbox--error': error }" :disabled="disabled">
    <span>
      <input :id="name" v-model="checkboxValue" type="checkbox" :disabled="disabled" />
      <label
        class="checkbox__label"
        :class="{
          'checkbox__label--required': ($slots.default || label) && isRequired,
        }"
        tabindex="0"
        :for="name"
      >
        <slot name="default">{{ label }}</slot>
      </label>
      <span class="checkbox__text">
        <slot name="text">{{ text }}</slot>
      </span>
    </span>
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

const isRequired = computed(() => props.rules?.includes('required'))

const { errors, validate } = useField(props.name, props.rules, {
  /**
   * We need to force validation to ignore auto form update, cause we are doing it manually
   */
  validateOnValueUpdate: false,
})

const checkboxValue = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})

watch(
  () => props.modelValue,
  () => validate(),
)
</script>

<style lang="scss">
.checkbox {
  margin: 12px 0;
  text-align: left;

  input {
    display: none;
  }

  &__label {
    display: inline-flex;
    font-size: rem(14);
    line-height: rem(16);

    &--required::after {
      content: ' *';
      color: var(--secondary-color);
      font-weight: bold;
    }
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
      color: var(--primary-color-alt);
    }
  }

  input:checked + label::before {
    background-color: var(--primary-color-alt);
    background-image: url('@/assets/icons/check.svg');
    border-color: var(--primary-color-alt);
  }

  input:disabled + label::before {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__error {
    font-size: rem(10);
    color: var(--error-color);
    padding-left: 24px;
    font-weight: 500;

    &:empty {
      display: none;
    }
  }

  &--error label::before {
    border-color: var(--error-color);
  }
  &--error label {
    color: var(--error-color);
  }
}
</style>
