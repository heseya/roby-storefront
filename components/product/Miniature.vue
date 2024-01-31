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

      <Media
        :media="product.cover"
        width="200"
        height="200"
        class="product-miniature__cover"
        :style="{
          aspectRatio: config.env.product_miniature_cover_aspect_ratio || '1/1',
          padding: config.env.product_miniature_cover_padding || '4px',
        }"
      />
    </div>

    <div class="product-miniature__content">
      <span class="product-miniature__name">
        {{ product.name }}
      </span>
      <span class="product-miniature__subtext">
        {{ getProductSubtext(product, config.productSubtextAttr) }}
      </span>
      <template v-if="!hidePrice">
        <ProductPrice class="product-miniature__price" :product="product" />
        <LazyProductPageOmnibus
          v-if="showOmnibus"
          :product="product"
          class="product-miniature__omnibus"
        />

        <template v-if="showAddToCart">
          <LayoutButton
            v-if="product.has_schemas"
            class="product-miniature__btn product-miniature__btn--cart"
          >
            {{ $t('offers.configure') }}
          </LayoutButton>
          <LayoutButton
            v-else
            class="product-miniature__btn product-miniature__btn--cart"
            @click.prevent="handleAddToCart"
          >
            {{ $t('offers.addToCart') }}
          </LayoutButton>
        </template>
      </template>

      <LayoutButton v-else-if="askForPrice" class="product-miniature__btn">
        {{ $t('offers.pricing') }}
      </LayoutButton>
      <span v-else class="product-miniature__unavailable"> {{ $t('offers.unavailable') }} </span>

      <ProductFavouriteButton class="product-miniature__wishlist-btn" :product="product" />
      <slot />
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { useConfigStore } from '@/store/config'
import { ASK_FOR_PRICE_KEY } from '@/consts/metadataKeys'

import { ExtendedProductList } from '~/types/Product'

const $t = useGlobalI18n()
const localePath = useLocalePath()
const config = useConfigStore()

const props = defineProps<{
  product: ExtendedProductList
  horizontal?: boolean
  forceSize?: boolean
}>()

const { notify } = useNotify()

const askForPrice = computed(() => props.product?.metadata?.[ASK_FOR_PRICE_KEY])

const hidePrice = computed(() => askForPrice.value || !props.product.available)

const showAddToCart = computed(() => config.env.show_add_to_cart_on_lists === '1')

const showOmnibus = useShowOmnibus(props.product)

const { addToCart } = useAddToCart(props.product)

const handleAddToCart = () => {
  addToCart([])
  notify({
    title: $t('cart.added'),
    type: 'success',
  })
}
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
    // max-height: 200px;
    border: solid 1px $gray-color-300;
    position: relative;
  }

  &__content {
    @include flex-column;
    height: 100%;
    width: 100%;
    justify-content: space-between;
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

    &:empty {
      margin: 0;
    }
  }

  &__price {
    display: block;
    font-size: rem(16);
    margin-top: 12px;
    font-weight: 600;
  }

  &__unavailable {
    font-size: rem(14);
    color: $gray-color-700;
  }

  &__omnibus {
    font-size: rem(10) !important;
    line-height: rem(14);
  }

  &__btn {
    width: 100%;

    &--cart {
      margin-top: 8px;
    }
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
