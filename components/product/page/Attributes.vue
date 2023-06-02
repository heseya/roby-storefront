<template>
  <div class="product-attributes">
    <ul class="product-attributes__list">
      <li v-for="[name, value] in parsedAttributes" :key="name" class="product-attributes__item">
        <b>{{ name }}</b>
        <span>{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Product } from '@heseya/store-core'

const props = defineProps<{
  product: Product
}>()

const parsedAttributes = computed(() => {
  return (
    props.product.attributes?.map((a) => [
      a.name,
      a.selected_options.map((o) => o.name || o.value_date || o.value_number).join(', '),
    ]) || []
  )
})
</script>

<style lang="scss" scoped>
.product-attributes {
  max-width: 600px;
  // margin: 0 auto;

  @media ($viewport-8) {
    align-self: flex-start;
  }

  &__title {
    font-size: rem(20);
    line-height: rem(26);
    font-weight: 500;
    margin-bottom: 16px;
  }

  &__list {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }

  &__item {
    display: grid;
    padding: 8px 16px;
    grid-template-columns: 1fr 1fr;

    &:nth-child(odd) {
      background-color: $gray-color-100;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>
