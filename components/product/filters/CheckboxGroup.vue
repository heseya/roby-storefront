<template>
  <div
    v-if="options.length > 0"
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
import { Attribute, AttributeOption, HeseyaPaginationMeta } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    attribute: Attribute
    productSetSlug?: string
    value?: string[] | string
  }>(),
  {
    value: () => [],
    productSetSlug: undefined,
  },
)
const emit = defineEmits<{
  (e: 'update:value', value: string[]): void
}>()

const heseya = useHeseya()

const containerRef = ref<HTMLElement>()
const { height: containerHeight } = useElementSize(containerRef)
const { arrivedState: containerScrollState } = useScroll(containerRef)
const containerScrollHeight = useElementScrollHeight(containerRef)
const isScrollable = computed(() => containerScrollHeight.value > containerHeight.value)

const pagination = ref<HeseyaPaginationMeta>({ currentPage: 0, lastPage: 0, perPage: 0, total: 0 })
const options = ref<AttributeOption[]>([])

const loadOptions = async (page = 1) => {
  try {
    const { data, pagination: meta } = await heseya.Attributes.getOptions(props.attribute.id, {
      page,
      product_set_slug: props.productSetSlug,
      sort: 'desc',
    })
    options.value = [...options.value, ...data]
    pagination.value = meta
  } catch (e) {
    const formatError = useErrorMessage()
    const { notify } = useNotify()
    notify({
      type: 'error',
      text: formatError(e),
    })
  }
}

loadOptions(1)

onMounted(() => {
  useInfiniteScroll(
    containerRef,
    () => {
      if (pagination.value.currentPage < pagination.value.lastPage)
        loadOptions(pagination.value.currentPage + 1)
    },
    { distance: 10 },
  )
})

const innerValue = computed(() => (Array.isArray(props.value) ? props.value : [props.value]))
const isChecked = (optionId: string) => innerValue.value.includes(optionId)

const toggleCheckbox = (optionId: string) => {
  const newValue = isChecked(optionId)
    ? innerValue.value.filter((v) => v !== optionId)
    : [...innerValue.value, optionId]
  emit('update:value', newValue.filter(Boolean))
}
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
    pointer-events: none;
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
