<template>
  <div class="product-page-variants">
    <div v-for="set in variantsSets" :key="set.id" class="product-variant">
      <span class="product-variant__name">{{ set.metadata[VARIANT_NAME_KEY] || set.name }}</span>
      <div class="product-variant__options">
        <NuxtLink
          v-for="option in products?.[set.id]?.data || []"
          :key="option.id"
          class="product-variant__option"
          exact-active-class="product-variant__option--current"
          :to="localePath(`/product/${option.slug}`)"
        >
          {{ option.metadata[VARIANT_NAME_KEY] || option.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@heseya/store-core'

import { PRODUCT_SET_SHOW_AS_VARIANT } from '@/consts/metadataKeys'

const localePath = useLocalePath()

const props = defineProps<{
  product: Product
}>()

const VARIANT_NAME_KEY = 'variant_name'

const heseya = useHeseya()

const variantsSets = computed(() =>
  props.product.related_sets.filter((set) => set.metadata[PRODUCT_SET_SHOW_AS_VARIANT]),
)

const { data: products } = useAsyncData(async () => {
  const productsTuple = await Promise.all(
    variantsSets.value.map(
      async (set) => [set.id, await heseya.Products.get({ sets: [set.slug] })] as const,
    ),
  )
  return Object.fromEntries(productsTuple)
})
</script>

<style lang="scss" scoped>
.product-page-variants {
  width: 100%;
}

.product-variant {
  &__name {
    font-size: rem(11);
    color: $gray-color-600;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  &__option {
    padding: 2px 4px;
    border: solid 1px $gray-color-400;
    color: $gray-color-700;
    transition: 0.3s;
    font-size: rem(12);
    text-decoration: none;

    &--current {
      border-color: var(--primary-color);
      background-color: var(--primary-color);
      color: #fff;
    }

    &:not(&--current):hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
}
</style>
