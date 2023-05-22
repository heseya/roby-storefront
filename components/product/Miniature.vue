<template>
  <NuxtLink
    :to="localePath(`/product/${product.slug}`)"
    class="product-miniature"
    :class="{
      'product-miniature--horizontal': horizontal,
      'product-miniature--force-size': forceSize,
    }"
  >
    <div class="product-miniature__header">
      <div class="product-miniature__tags">
        <ProductTag v-for="tag in product.tags" :key="tag.id" :color="`#${tag.color}`">
          {{ tag.name }}
        </ProductTag>
      </div>

      <Media :media="product.cover" width="200" height="200" class="product-miniature__cover" />
    </div>

    <div class="product-miniature__content">
      <span class="product-miniature__name">
        {{ product.name }}
      </span>
      <span class="product-miniature__subtext"> {{ getProductSubtext(product) }} </span>
      <ProductPrice v-if="showPrice" class="product-miniature__price" :product="product" />
      <LayoutButton v-else class="product-miniature__btn">
        {{ $t('custom.pricing') }}
      </LayoutButton>

      <ProductFavouriteButton class="product-miniature__wishlist-btn" :product="product" />
      <slot />
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ProductList } from '@heseya/store-core'
import { getProductSubtext } from '@/utils/product'
import { ASK_FOR_PRICE_KEY } from '@/consts/metadataKeys'

const $t = useGlobalI18n()
const localePath = useLocalePath()

const props = defineProps<{
  product: ProductList
  horizontal?: boolean
  forceSize?: boolean
}>()

const showPrice = computed(() => {
  return !props.product?.metadata?.[ASK_FOR_PRICE_KEY] ?? true
})
</script>

<style lang="scss" scoped>
.product-miniature {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
  text-decoration: none;
  width: 100%;
  max-width: 200px;
  color: $text-color;
  position: relative;

  &--force-size {
    min-width: 200px;
  }

  &--horizontal {
    flex-direction: row;
    gap: 12px;
    padding-right: 48px;
    max-width: 100%;

    @media ($viewport-7) {
      gap: 32px;
    }
  }

  &__header {
    max-width: 200px;
    max-height: 200px;
    border: solid 1px $gray-color-300;
    position: relative;
  }

  &__content {
    width: 100%;
  }

  &__tags {
    position: absolute;
    left: 0;
    top: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 2;
  }

  &__cover {
    display: block;
    aspect-ratio: 1/1;
    padding: 4px;
    transition: 0.3s;
  }

  &:hover &__cover {
    transform: scale(1.02);
  }

  &--horizontal &__cover {
    min-height: 100px;

    @media ($viewport-10) {
      min-height: 160px;
    }
  }
  &--horizontal &__header {
    max-width: 100px;
    max-height: 100px;

    @media ($viewport-10) {
      max-width: 160px;
      max-height: 160px;
    }
  }

  &__name {
    display: block;
    transition: 0.3s;
  }

  &__subtext {
    display: block;
    margin-top: 6px;
    color: $gray-color-600;
  }

  &__price {
    display: block;
    font-size: rem(16);
    margin-top: 16px;
    font-weight: 600;
  }

  &__btn {
    width: 100%;
  }

  &:hover &__name {
    color: var(--secondary-color);
  }

  &__wishlist-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    opacity: 0;

    @media (pointer: coarse) {
      opacity: 1;
    }
  }

  &:hover &__wishlist-btn,
  &--horizontal &__wishlist-btn {
    opacity: 1;
  }
}
</style>
