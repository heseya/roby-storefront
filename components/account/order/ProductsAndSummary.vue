<template>
  <div class="products-and-summary">
    <div>
      <div class="products-and-summary__header">{{ t('orderedProducts') }}</div>
      <div class="products-and-summary__product-list">
        <div v-for="{ id, product, name, quantity, price } in order.products" :key="id">
          <div class="products-and-summary__product">
            <div class="products-and-summary__product-img">
              <AccountProductCard :product="product" />
            </div>
            <div class="products-and-summary__product-box">
              <div class="products-and-summary__product-name">{{ name }}</div>
              <div class="products-and-summary__product-price">
                <div>{{ quantity }} {{ t('quantity') }}</div>
                <div>{{ showPrice(price) }}</div>
              </div>
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
            {{ showPrice(Number(productsPrice) + order.shipping_price) }}
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

const showPrice = (price: number) => `${price.toFixed(2).replace(/\./g, ',')} ${t('currency')}`

const productsPrice = computed(() => props.order.products.reduce((acc, cur) => acc + cur.price, 0))
</script>

<style lang="scss" scoped>
.products-and-summary {
  display: grid;
  align-content: space-between;
  padding-left: 4px;

  &__header {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
  }

  &__product,
  &__summary-box,
  &__product-box {
    display: flex;
    justify-content: space-between;
  }

  &__product-box {
    margin-left: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  &__product-name {
    width: 66%;
  }

  &__product-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 66%;

    @media ($viewport-12) {
      justify-content: flex-end;
    }
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

    padding: 6px 0px;
  }

  &__product-list {
    display: grid;
    margin: 15px 0px;
    gap: 15px;
  }
}
</style>
