<template>
  <nuxt-link
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
      <span class="product-miniature__subtext"> {{ productSubtext }} </span>
      <ProductPrice class="product-miniature__price" :product="product" />

      <slot />
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { ProductList } from '@heseya/store-core'
import { PRODUCT_SUBTEXT_ATTRIBUTE_NAME } from '~~/consts/subtextAttribute'

const localePath = useLocalePath()

const props = defineProps<{
  product: ProductList
  horizontal?: boolean
}>()

const productSubtext = computed(() => {
  // TODO: do not attribute from fixed string
  return props.product?.attributes.find((a) => a.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME)
    ?.selected_options[0]?.name
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
    min-height: 200px;
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

  &:hover &__name {
    color: var(--primary-color);
  }
}
</style>
