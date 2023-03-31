<template>
  <div class="cart-page">
    <div class="cart-page__content">
      <div class="cart-page__cart">
        <h1 class="cart-page__title">
          {{ t('cart.title') }}
          <ClientOnly>
            <span class="cart-page__subtext">({{ cart.length }})</span>
          </ClientOnly>
        </h1>

        <div class="cart-page__list">
          <ClientOnly>
            <CartItem
              v-for="item in cart.items"
              :key="item.id"
              :item="item"
              class="cart-page__item"
            />
          </ClientOnly>
        </div>
      </div>

      <div class="cart-page__summary">
        <h2 class="cart-page__title cart-page__title--hideable">{{ t('cart.summary') }}</h2>

        <ClientOnly>
          <CartSummary class="cart-page__summary-box" />
        </ClientOnly>
      </div>
    </div>

    <div class="cart-page__suggested">TODO: Sugerowane produkty</div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "cart": {
      "title": "Koszyk",
      "summary": "Podsumowanie"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'

const cart = useCartStore()
const t = useLocalI18n()

const router = useRouter()

watch(
  () => cart.length,
  () => {
    if (cart.length === 0) router.push('/')
  },
)

onMounted(() => {
  if (cart.length === 0) router.push('/')
})
</script>

<style lang="scss" scoped>
.cart-page {
  max-width: $container-width;
  padding: 0 $container-padding;
  margin: 0 auto;
  margin-bottom: 50px;

  @media ($viewport-10) {
    margin-top: 90px;
  }

  &__title {
    font-size: rem(26);
    line-height: rem(34);
    font-weight: 600;
    margin-bottom: 16px;

    &--hideable {
      @media ($max-viewport-10) {
        display: none;
      }
    }
  }

  &__subtext {
    color: $gray-color-600;
    font-weight: 400;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 24px;

    @media ($viewport-10) {
      grid-template-columns: 1fr minmax(auto, 400px);
    }
  }

  &__item {
    padding: 16px 0;

    &:not(:last-child) {
      border-bottom: solid 2px $gray-color-300;
    }
  }

  &__summary-box {
    background-color: $gray-color-100;
  }

  &__suggested {
    margin-top: 40px;
    width: 100%;
    padding: 24px;
    background-color: $gray-color-100;
    text-align: center;
    color: $gray-color-400;

    @media ($viewport-10) {
      margin-top: 90px;
    }
  }
}
</style>
