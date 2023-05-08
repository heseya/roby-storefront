<template>
  <div class="products-and-summary">
    <div>
      <div class="products-and-summary__header">{{ t('orderedProducts') }}</div>
      <div class="products-and-summary__product-list">
        <div v-for="{ id, product, name, quantity, price } in order.products" :key="id">
          <div class="products-and-summary__product">
            <div class="products-and-summary__product-name">
              <AccountProductCard :product="product" />
              {{ name }}
            </div>
            <div class="products-and-summary__product-price">
              <div>{{ quantity }} {{ t('quantity') }}</div>
              <div>{{ showPrice(price) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="products-and-summary__summary">
        <div class="products-and-summary__summary-box" :style="{ 'margin-bottom': '6px' }">
          <div>{{ t('productsPrice') }}</div>
          <div>{{ showPrice(productsPrice) }}</div>
        </div>
        <div class="products-and-summary__summary-box">
          <div>{{ t('delivery') }}</div>
          <div>{{ showPrice(order.shipping_price) }}</div>
        </div>
      </div>
      <div class="products-and-summary__summary">
        <div class="products-and-summary__summary-box" :style="{ 'margin-top': '6px' }">
          <div>{{ t('totalAmount') }}</div>
          <div class="products-and-summary__summary-total">
            {{ showPrice(productsPrice + order.shipping_price) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "delivery": "Dostawa",
    "orderedProducts": "Zamówione produkty",
    "productsPrice": "Cena produktów",
    "totalAmount": "Łączna kwota",
    "quantity": "szt.",
    "currency": "zł"
  }
}
</i18n>

<script setup lang="ts">
import { Order } from '@heseya/store-core'
const t = useLocalI18n()

const props = defineProps<{
  order: Order
}>()

const showPrice = (price: number) => `${String(price).replace(/\./g, ',')} ${t('currency')}`

const productsPrice = computed(() => props.order.products.reduce((acc, cur) => acc + cur.price, 0))
</script>

<style lang="scss" scoped>
.products-and-summary {
  display: grid;
  align-content: space-between;

  &__header {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
  }

  &__product,
  &__summary-box {
    display: flex;
    justify-content: space-between;
  }

  &__product-name,
  &__product-price {
    display: flex;
    align-items: center;
  }

  &__product-name {
    gap: 16px;
  }

  &__product-price {
    gap: 44px;
  }

  &__summary-total {
    font-weight: bold;
    font-size: 20px;
  }

  &__summary {
    border-top: 1px solid $gray-color-300;
    margin-top: 6px;
    padding: 6px 0px;
  }

  &__product-list {
    display: grid;
    margin: 15px 0px;
    gap: 15px;
  }
}
</style>
