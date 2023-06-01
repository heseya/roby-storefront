<template>
  <div ref="menu" class="layout-nav-menu" @click="toggleDropdown">
    <slot></slot>
    <div class="layout-nav-menu__item">{{ $t(`languages.${selectedItem}`) }}</div>
    <LayoutIcon
      :icon="showDropdown ? arrowUp : arrowDown"
      class="layout-nav-menu__icon"
      @click.stop="toggleDropdown"
    />

    <div v-show="showDropdown" class="layout-nav-menu__dropdown">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="layout-nav-menu__option"
        @click.stop="selectAndClose(item)"
      >
        <slot name="options" :value="item"></slot>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import arrowDown from '@/assets/icons/arrow-down.svg?component'
import arrowUp from '@/assets/icons/arrow-up.svg?component'

const $t = useGlobalI18n()

const props = defineProps<{
  selectedItem: string
  items: string[]
}>()

const emit = defineEmits<{
  (event: 'update:selectedItem', value: string): void
}>()

const menu = ref<HTMLElement | null>(null)
const showDropdown = ref<boolean>(false)

const menuItem = computed({
  get: () => props.selectedItem,
  set: (value: string) => emit('update:selectedItem', value),
})

const selectAndClose = (value: string) => {
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

  &__item {
    margin-left: 4px;
  }
}
</style>
