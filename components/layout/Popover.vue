<template>
  <div
    ref="target"
    class="layout-popover"
    :class="{ 'layout-popover--disabled': props.disabled }"
    @click="toggleDropdown"
  >
    <slot name="option" :value="props.value"> {{ props.value.key }}</slot>

    <LayoutIcon
      v-if="!props.disabled"
      :icon="showDropdown ? arrowUp : arrowDown"
      class="layout-popover__icon"
      @click.stop="toggleDropdown"
    />

    <div
      v-if="!props.disabled"
      class="layout-popover__dropdown"
      :class="{ 'layout-popover__dropdown--visible': showDropdown }"
    >
      <button
        v-for="(item, index) in options"
        :key="index"
        class="layout-popover__option"
        @click.stop="selectAndClose(item)"
      >
        <slot name="option" :value="item"> {{ item.key }}</slot>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends { key: string }">
import { onClickOutside } from '@vueuse/core'
import arrowDown from '@/assets/icons/arrow-down.svg?component'
import arrowUp from '@/assets/icons/arrow-up.svg?component'

defineSlots<{
  option(props: { value: T }): any
}>()

const props = defineProps<{
  value: T
  options: T[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:value', value: T): void
}>()

const target = ref(null)

const showDropdown = ref<boolean>(false)

const selectAndClose = (value: T) => {
  emit('update:value', value)
  showDropdown.value = false
}

const toggleDropdown = () => {
  if (props.disabled) return
  showDropdown.value = !showDropdown.value
}

onClickOutside(target, () => {
  showDropdown.value = false
})
</script>

<style lang="scss" scoped>
.layout-popover {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  user-select: none;

  &--disabled {
    cursor: default;
  }

  &__dropdown {
    width: 160px;
    max-height: 60vh;
    overflow: auto;
    position: absolute;
    right: 0px;
    top: 30px;
    border: 1px solid $gray-color-300;
    background-color: $white-color;
    z-index: 10;
    padding: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;

    &--visible {
      opacity: 1;
      visibility: visible;
      top: 42px;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    user-select: none;
    gap: 4px;
    width: 100%;
    text-align: left;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 8px;

    &:hover {
      background: $blue-color-100;
    }
  }

  &__icon {
    margin-top: 7px;
    padding: 5px;
  }
}
</style>
