<template>
  <div class="cart-item">
    <SmartLink :to="`/product/${item.product.slug}`" class="cart-item__cover-wrapper">
      <Media width="120" class="cart-item__cover" :media="item.coverMedia" />
    </SmartLink>

    <div class="cart-item__content">
      <SmartLink :to="`/product/${item.product.slug}`" class="cart-item__main">
        <span class="cart-item__name">{{ item.name }}</span>
        <span
          v-for="[name, value] in filterSchemaVariant(item.variant)"
          :key="name"
          class="cart-item__schema"
        >
          {{ name }}: <b>{{ formatSchemaValue(value) }}</b>
        </span>
      </SmartLink>

      <ProductQuantityInput
        show-label
        :disabled="props.static"
        class="cart-item__quantity"
        :quantity="item.totalQty"
        @update:quantity="updateQuantity"
      />

      <div class="cart-item__price">
        <span
          v-if="item.totalInitialPrice.net !== item.totalPrice.net"
          class="cart-item__price-initial"
        >
          {{ formatAmount(getDisplayedPrice(item.totalInitialPrice).value, currency) }}
        </span>
        <span class="cart-item__price-current">{{
          formatAmount(getDisplayedPrice(item.totalPrice).value, currency)
        }}</span>
        <span v-if="getSecondPrice(item.totalPrice).value" class="cart-item__price-gross">{{
          `${formatAmount(getSecondPrice(item.totalPrice).value, currency)} ${t('priceType.gross')} (${vatRate}% VAT)`
        }}</span>
      </div>
    </div>

    <div v-if="!props.static" class="cart-item__actions">
      <LayoutIconButton
        :icon="CrossIcon"
        icon-size="sm"
        :title="t('cart.remove')"
        @click="removeFromCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItem } from '@heseya/store-core'
import type { CartItemRawSchemaValue } from '@heseya/store-core'

import CrossIcon from '@/assets/icons/cross.svg?component'
import { useCartStore } from '@/store/cart'
import { isNil } from '~/utils/utils'

const { t } = useI18n()
const currency = useCurrency()
const vatRate = useVatRate()

const props = withDefaults(
  defineProps<{
    item: CartItem
    static?: boolean
  }>(),
  {
    static: false,
  },
)

const cart = useCartStore()
const { getDisplayedPrice, getSecondPrice } = useGetDisplayedPrice()

const updateQuantity = (newQty: number) => {
  cart.setQuantity(props.item.id, newQty)
}

const removeFromCart = () => {
  cart.remove(props.item.id)
}

const formatSchemaValue = (value: CartItemRawSchemaValue) => {
  return value
}

const filterSchemaVariant = (variant: [string, CartItemRawSchemaValue][]) => {
  return variant.filter(([n, v]) => !!n && !isNil(v))
}
</script>

<style lang="scss" scoped>
.cart-item {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  grid-gap: 20px;

  &__cover-wrapper {
    width: 100px;
    height: 100px;
    border: solid 1px $gray-color-300;

    @media ($viewport-8) {
      width: 120px;
      height: 120px;
    }
  }

  &__cover {
    width: 100%;
    height: 100%;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: start;
    grid-gap: 8px;

    @media ($viewport-8) {
      grid-template-columns: 5fr 2fr 3fr;
      grid-gap: 20px;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: $text-color;
  }

  &__name {
    font-weight: 600;
    font-size: rem(16);
    margin-bottom: 4px;
    transition: 0.3s;
  }

  &__main:hover &__name {
    color: var(--highlight-color);
  }

  &__schema {
    font-size: rem(10);
    line-height: 1.2em;
    color: $gray-color-600;
  }

  &__price {
    position: relative;
    font-size: rem(16);

    @media ($viewport-8) {
      margin-left: auto;
    }
  }

  &__price-initial {
    text-decoration: line-through;
    margin-right: 8px;
  }

  &__price-current {
    font-weight: 600;
  }

  &__price-gross {
    position: absolute;
    right: 0;
    text-align: right;
    display: block;
    font-size: rem(12);
    font-weight: 500;
    color: $gray-color-600;
    white-space: nowrap;
  }

  &__price-initial + &__price-current {
    color: var(--highlight-color);
  }

  &__btn {
    all: unset;
    cursor: pointer;
  }
}
</style>
