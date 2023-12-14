<template>
  <div class="switch" :class="{ 'switch--disabled': disabled }">
    <input
      :id="name"
      v-model="checkboxValue"
      type="checkbox"
      :name="name"
      class="switch__input"
      :disabled="disabled"
    />
    <label class="switch__label" :for="name"></label>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    checked?: boolean
    disabled?: boolean
  }>(),
  {
    checked: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  (event: 'update:checked', value: boolean): void
}>()

const checkboxValue = computed({
  get() {
    return props.checked
  },
  set(value: boolean) {
    emit('update:checked', value)
  },
})
</script>

<style lang="scss" scoped>
.switch {
  &__input {
    display: none;
  }

  &__label {
    display: block;
    width: 36px;
    height: 20px;
    background-color: $gray-color-300;
    transition: transform 200ms ease-in-out;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    &::after {
      content: '';
      top: 2px;
      left: 2px;
      position: absolute;
      display: block;
      width: 16px;
      height: 16px;
      background-color: $white-color;
      border-radius: 50%;
      transition: transform 200ms ease-in-out;
    }
  }

  &__input:checked + &__label {
    background-color: var(--primary-color);

    &::after {
      transform: translateX(16px);
    }
  }

  &--disabled &__label {
    cursor: not-allowed;
  }

  &--disabled &__label::after {
    background-color: $gray-color-400;
  }

  &--disabled &__input:checked + &__label::after {
    background-color: #fff;
    opacity: 0.45;
  }
}
</style>
