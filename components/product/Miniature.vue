<template>
  <NuxtLink
    :to="localePath(`/product/${product.slug}`)"
    class="product-miniature"
    :class="{ 'product-miniature--horizontal': horizontal }"
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
      <LayoutButton v-else class="product-miniature__btn"> {{ t('askForPrice') }} </LayoutButton>

      <slot />
    </div>
  </NuxtLink>
</template>

<i18n lang="json">
{
  "pl": {
    "askForPrice": "Zapytaj o cenę"
  }
}
</i18n>

<script lang="ts" setup>
import { ProductList } from '@heseya/store-core'
import { getProductSubtext } from '@/utils/product'
import { ASK_FOR_PRICE_KEY } from '@/consts/metadataKeys'

const t = useLocalI18n()

const props = defineProps<{
  product: ProductList
  horizontal?: boolean
}>()

const showPrice = computed(() => {
  return !props.product?.metadata?.[ASK_FOR_PRICE_KEY] ?? true
})
</script>

<style lang="scss" scoped>
.product-miniature {
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
  text-decoration: none;
  width: 100%;
  max-width: 200px;
  color: $text-color;
  position: relative;

  &--horizontal {
    flex-direction: row;
    gap: 12px;
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
  }

  &__cover {
    display: block;
    aspect-ratio: 1/1;
    padding: 4px;
  }

  &--horizontal &__cover {
    min-height: 100px;

    @media ($viewport-10) {
      min-height: 200px;
    }
  }
  &--horizontal &__header {
    max-width: 100px;
    max-height: 100px;

    @media ($viewport-10) {
      max-width: 200px;
      max-height: 200px;
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
    color: var(--primary-color);
  }
}
</style>
