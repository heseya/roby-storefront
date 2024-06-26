<template>
  <div class="tabs" :class="`tabs--${type}`">
    <div v-if="showHeaders" class="tabs__header">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tabs__button"
        :class="{
          'tabs__button--active': tab.key === activeTabKey,
          'tabs__button--highlighted': tab.highlighted,
        }"
        @click="activeTabKey = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs__content">
      <slot :name="activeTabKey" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Tab {
  label: string
  key: string
  highlighted?: boolean
}

const props = withDefaults(
  defineProps<{
    tabs: Tab[]
    type?: 'default' | 'gray'
    hideSingleTab?: boolean
  }>(),
  {
    type: 'default',
    hideSingleTab: false,
  },
)

const activeTabKey = ref(props.tabs[0]?.key)

watch(
  () => props.tabs,
  () => {
    // If tabs changed, and active tab is not in new tabs, set first tab as active
    if (!props.tabs.find((tab) => tab.key === activeTabKey.value))
      activeTabKey.value = props.tabs[0]?.key
  },
)

const showHeaders = computed(() => props.tabs.length > 1 || !props.hideSingleTab)
</script>

<style lang="scss" scoped>
.tabs {
  &__header {
    display: flex;
    align-items: center;
  }

  &__button {
    all: unset;
    color: $gray-color-600;
    font-weight: 400;
    font-size: rem(16);
    cursor: pointer;
    padding: 12px;
    transition: 0.3s;
    position: relative;
    text-align: center;

    &::before {
      content: '';
      display: block;
      width: calc(100% - 24px);
      bottom: 8px;
      left: 12px;
      position: absolute;
      border-bottom: solid 2px $transparent;
      transition: 0.3s;
    }

    &:hover,
    &--active {
      color: var(--secondary-color);
    }

    &--active::before {
      border-color: var(--secondary-color);
    }
  }

  &__content {
    padding: 12px;
  }

  &--gray {
    border: solid 1px $gray-color-100;
  }
  &--gray &__header {
    justify-content: center;
  }

  &--gray &__content {
    background-color: $gray-color-100;
    padding: 16px 20px;
  }

  &--gray &__button {
    color: $text-color;
    background-color: #fff;
    text-transform: uppercase;
    width: 100%;
    font-size: rem(14);
    font-weight: 500;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    &::before {
      display: none;
    }

    &:not(&--active):hover {
      color: var(--secondary-color);
      background-color: $gray-color-050;
      // filter: brightness(1.5);
    }

    &--active {
      background-color: $gray-color-100;
      color: $text-color;
      cursor: default;
    }

    &--highlighted {
      color: #fff;
      background-color: var(--secondary-color);

      &:hover {
        color: #fff;
        background-color: var(--secondary-color);
      }
    }

    &--active:is(&--highlighted) {
      color: var(--secondary-color);
      background-color: $gray-color-050;
    }

    &:not(&--active):is(&--highlighted):hover {
      color: #fff;
      background-color: var(--secondary-color);
      filter: brightness(1.5);
    }
  }
}
</style>
