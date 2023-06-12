<template>
  <OnClickOutside class="layout-popover" @trigger="toggleDropdown" @click="toggleDropdown">
    <slot></slot>

    <LayoutIcon
      :icon="showDropdown ? arrowUp : arrowDown"
      class="layout-popover__icon"
      @click.stop="toggleDropdown"
    />

    <div v-show="showDropdown" class="layout-popover__dropdown">
      <button
        v-for="(item, index) in options"
        :key="index"
        class="layout-popover__option"
        @click.stop="selectAndClose(item)"
      >
        <slot name="option" :value="item"> {{ item }}</slot>
      </button>
    </div>
  </OnClickOutside>
</template>

<script lang="ts" setup generic="T extends { key: string }">
import { OnClickOutside } from '@vueuse/components'
import arrowDown from '@/assets/icons/arrow-down.svg?component'
import arrowUp from '@/assets/icons/arrow-up.svg?component'

const props = defineProps<{
  value: T
  options: T[]
}>()

const emit = defineEmits<{
  (event: 'update:value', value: T): void
}>()

const showDropdown = ref<boolean>(false)

const menuItem = computed({
  get: () => props.value,
  set: (value: T) => emit('update:value', value),
})

const selectAndClose = (value: T) => {
  menuItem.value = value
  showDropdown.value = false
}

const toggleDropdown = (): boolean => (showDropdown.value = !showDropdown.value)
</script>

<style lang="scss" scoped>
.layout-popover {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  user-select: none;

  &__dropdown {
    width: 250px;
    position: absolute;
    right: 0px;
    top: 42px;
    border: 1px solid $gray-color-300;
    background-color: $white-color;
    z-index: 10;
    padding: 16px;
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
    &:hover {
      background: $unnamed-color-f4f8fc;
    }
  }

  &__icon {
    margin-top: 7px;
    padding: 5px;
  }
}
</style>
