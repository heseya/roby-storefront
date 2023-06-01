<template>
  <div ref="menu" class="layout-nav-menu" @click="toggleDropdown">
    <LayoutIcon v-if="selectedItem.icon" :icon="selectedItem.icon" />
    {{ selectedItem.text }}
    <LayoutIcon :icon="showDropdown ? arrowUp : arrowDown" class="layout-nav-menu__icon" />

    <div v-show="showDropdown" class="layout-nav-menu__dropdown">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="layout-nav-menu__option"
        @click.stop="selectAndClose(item)"
      >
        <LayoutIcon v-if="item.icon" :icon="item.icon" />
        {{ item.text }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FunctionalComponent } from 'vue'
import arrowDown from '@/assets/icons/arrow-down.svg?component'
import arrowUp from '@/assets/icons/arrow-up.svg?component'

export interface MenuItem {
  text: string
  value: string
  icon?: FunctionalComponent
}

const props = defineProps<{
  selectedItem: MenuItem
  items: MenuItem[]
}>()

const emit = defineEmits<{
  (event: 'update:selectedItem', value: MenuItem): void
}>()

const menu = ref<HTMLElement | null>(null)
const showDropdown = ref<boolean>(false)

const menuItem = computed({
  get: () => props.selectedItem,
  set: (value: MenuItem) => emit('update:selectedItem', value),
})

const selectAndClose = (value: MenuItem) => {
  menuItem.value = value
  showDropdown.value = false
}

const toggleDropdown = (): boolean => (showDropdown.value = !showDropdown.value)

const handler = (e: Event) => {
  if (menu.value && !menu.value.contains(e.target as Node)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handler)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handler)
})
</script>

<style lang="scss" scoped>
.layout-nav-menu {
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
    gap: 8px;
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
