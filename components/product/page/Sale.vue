<template>
  <div class="product-sale">
    <div class="product-sale__title">{{ sale.name }}</div>
    <BaseWysiwygContent class="product-sale__content" :content="sale.description_html" />
  </div>
</template>

<script setup lang="ts">
import type { ProductSale } from '@heseya/store-core'

defineProps<{
  sale: ProductSale
}>()
</script>

<style lang="scss" scoped>
.product-sale {
  width: 100%;
  max-width: 90vw;
  min-width: 280px;

  @media ($viewport-10) {
    max-width: 550px;
    min-width: 300px;
  }

  &__title {
    font-size: rem(18);
    line-height: rem(24);
    width: 100%;
    padding: 6px 15px;
    background-color: $green-color-500;
    color: #fff;
    text-align: left;
  }

  &__content {
    font-size: rem(14);
    line-height: rem(20);
    padding: 18px;
    border: solid 1px $gray-color-400;
    border-top: none;
  }
}
</style>
