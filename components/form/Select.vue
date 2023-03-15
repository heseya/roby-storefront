<template>
  <div class="select" :class="`select--${type}`">
    <label v-if="label" :for="name" class="select__label">{{ label }}</label>
    <select :id="name" v-model="innerValue" :name="name" class="select__input">
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number | string
    name: string
    label?: string
    type?: 'default' | 'gray'
  }>(),
  {
    label: '',
    type: 'default',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style lang="scss" scoped>
.select {
  width: 100%;

  &__input {
    all: unset;
    display: block;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    border: solid 1px $gray-color-300;
    border-radius: 5px;
    padding: 11px 14px;
    padding-right: 32px;
    background-image: url('@/assets/icons/arrow-drop-down.svg');
    background-repeat: no-repeat;
    background-position: right 15px center;
    cursor: pointer;
    transition: 0.3s;
    font-size: rem(12);

    @media ($viewport-6) {
      font-size: rem(14);
    }

    &:hover {
      background-color: $gray-color-100;
    }
  }

  &__label {
    color: $gray-color-900;
    font-size: rem(14);
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  &--gray &__input {
    background-color: $gray-color-300;
    border-color: $gray-color-300;

    &:hover {
      background-color: $gray-color-400;
    }
  }
}
</style>
