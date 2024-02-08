<template>
  <ProductPageCard class="product-attribute-card" :title="product?.name">
    <ul class="product-attribute-card__list">
      <li
        v-for="[name, value] in parsedAttributes"
        :key="name"
        class="product-attribute-card__item"
      >
        {{ name }}:
        <b>{{ value }}</b>
      </li>
    </ul>

    <!-- <div class="product-attribute-card__exposed-value">490</div>
    <div class="product-attribute-card__exposed-label">mililitrów tuszu startowego</div> -->
  </ProductPageCard>
</template>

<script setup lang="ts">
import type { Product } from '@heseya/store-core'

const props = defineProps<{
  product: Product
}>()

const shownAttributes = computed(() => {
  // TODO: which attributes should be shown?
  return props.product.attributes.filter((a) => a.selected_options.length > 0)
})

const parsedAttributes = computed(() => {
  return shownAttributes.value.map((a) => [
    a.name,
    a.selected_options.map((o) => o.name || o.value_date || o.value_number).join(', '),
  ])
})
</script>

<style lang="scss" scoped>
.product-attribute-card {
  align-self: center;

  @media ($viewport-8) {
    align-self: flex-start;
  }

  &__list {
    margin: 16px 0;
    padding-left: 16px;
  }

  &__item {
  }

  &__exposed-value {
    font-size: rem(30);
    line-height: rem(39);
    color: var(--secondary-color);
    font-weight: 600;
    text-align: center;
  }

  &__exposed-label {
    text-align: center;
  }
}
</style>
