<template>
  <nuxt-link :to="localePath(`/product/${product.slug}`)" class="product-miniature">
    <div class="product-miniature__header">
      <div class="product-miniature__tags">
        <div
          v-for="tag in product.tags"
          :key="tag.id"
          class="product-miniature__tag"
          :style="{ backgroundColor: `#${tag.color}` }"
        >
          {{ tag.name }}
        </div>
      </div>

      <Media :media="product.cover" width="200" height="200" class="product-miniature__cover" />
    </div>

    <span class="product-miniature__name">
      {{ product.name }}
    </span>
    <span class="product-miniature__subtext"> {{ productSubtext }} </span>
    <ProductPrice class="product-miniature__price" :product="product" />
  </nuxt-link>
</template>

<script lang="ts" setup>
import { ProductList } from '@heseya/store-core'

const localePath = useLocalePath()

const props = defineProps<{
  product: ProductList
}>()

const productSubtext = computed(() => {
  // TODO: from where should we get this?
  return props.product.metadata.brand || 'Canon'
})
</script>

<style lang="scss" scoped>
.product-miniature {
  display: block;
  text-align: left;
  text-decoration: none;
  width: 100%;
  max-width: 200px;
  color: $text-color;

  &__header {
    max-width: 200px;
    max-height: 200px;
    border: solid 1px $gray-color-300;
    position: relative;
  }

  &__tags {
    position: absolute;
    left: 0;
    top: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__tag {
    background-color: var(--secondary-color);
    padding: 2px 9px;
    font-size: rem(10);
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  &__cover {
    display: block;
    min-height: 200px;
    aspect-ratio: 1/1;
    padding: 4px;
  }

  &__name {
    display: block;
    margin-top: 14px;
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
}
</style>
