<template>
  <div class="radio-group" :class="{ 'radio-group--disabled': disabled }">
    <button
      v-for="option in options"
      :key="option.key"
      class="radio-group__button"
      type="button"
      :class="{ 'radio-group__button--active': radioValue === option.value }"
      @click="radioValue = option.value"
    >
      <slot :name="`${option.key}-label`"> {{ option.label }} </slot>
      <slot v-if="radioValue === option.value" :name="option.key"></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
type Value = string | number | boolean | null
type Option = { key: string; value: Value; label: string }

const props = withDefaults(
  defineProps<{
    name: string
    disabled?: boolean
    value: Value
    options: Option[]
  }>(),
  {
    name: '',
    disabled: false,
    value: null,
    options: () => [],
  },
)

const emit = defineEmits<{
  (event: 'update:value', value: Value): void
}>()

const radioValue = computed({
  get() {
    return props.value
  },
  set(value: Value): void {
    if (!props.disabled) emit('update:value', value)
  },
})
</script>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;

  &__button {
    all: unset;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1rem;
    transition: 0.3s;
    margin-bottom: 3px;
    position: relative;
    padding-left: 24px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &::before,
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      transition: 0.3s;
      position: absolute;
      left: 0;
      top: 0;
    }

    &::before {
      width: 16px;
      height: 16px;
      border: solid 1px $gray-color-400;
      margin-right: 8px;
    }

    &::after {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 8px;
      height: 8px;
      background-color: #fff0;
    }

    &:hover::before {
      background-color: #dce0e65e;
    }

    @media ($viewport-6) {
      border-radius: 0;
      margin-bottom: 0;
    }

    &--active {
      &::before {
        border-color: var(--secondary-color-alt);
      }

      &::after {
        background-color: var(--secondary-color-alt);
      }

      &:hover::before {
        background-color: var(--secondary-color);
      }
    }
  }

  &--disabled &__button {
    cursor: not-allowed;

    &::before {
      background-color: #dce0e65e;
    }

    &--active {
      &::before {
        background-color: var(--secondary-color);
      }
    }
  }
}
</style>
