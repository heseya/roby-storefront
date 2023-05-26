<template>
  <div
    class="filter-checkbox-group"
    :class="{
      'filter-checkbox-group--scrollable-up': isScrollable && !containerScrollState.top,
      'filter-checkbox-group--scrollable-down': isScrollable && !containerScrollState.bottom,
    }"
  >
    <FormInputLabel class="filter-checkbox-group__label" uppercase>
      {{ attribute.name }}
    </FormInputLabel>

    <div ref="containerRef" class="filter-checkbox-group__items">
      <FormCheckbox
        v-for="option in options"
        :key="option.id"
        :model-value="isChecked(option.id)"
        class="filter-checkbox-group__checkbox"
        :name="option.id"
        @update:model-value="() => toggleCheckbox(option.id)"
      >
        {{ option.name }}
      </FormCheckbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Attribute } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    attribute: Attribute
    value?: string[] | string
  }>(),
  {
    value: () => [],
  },
)
const emit = defineEmits<{
  (e: 'update:value', value: string[]): void
}>()

const heseya = useHeseya()
const containerRef = ref()
const { arrivedState: containerScrollState } = useScroll(containerRef)

const { data: options } = useLazyAsyncData(`options-${props.attribute.id}`, async () => {
  const { data } = await heseya.Attributes.getOptions(props.attribute.id)
  return data
})

const value = computed(() => (Array.isArray(props.value) ? props.value : [props.value]))

const isChecked = (optionId: string) => value.value.includes(optionId)

const toggleCheckbox = (optionId: string) => {
  const newValue = isChecked(optionId)
    ? value.value.filter((v) => v !== optionId)
    : [...value.value, optionId]
  emit('update:value', newValue.filter(Boolean))
}

const isScrollable = computed(
  () => containerRef.value?.scrollHeight > containerRef.value?.clientHeight,
)
</script>

<style lang="scss" scoped>
.filter-checkbox-group {
  position: relative;

  &::before,
  &::after {
    $height: 4em;
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: calc(100% - $height);
    height: $height;
    width: 100%;
    background: linear-gradient(180deg, $transparent 0%, $white-color 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
  }

  &::before {
    transform: rotate(180deg);
    top: 24px;
  }

  &--scrollable-up {
    &::before {
      opacity: 1;
    }
  }

  &--scrollable-down {
    &::after {
      opacity: 1;
    }
  }

  &__items {
    max-height: 300px;
    overflow: auto;
    @include styled-scrollbar;
  }
}
</style>
