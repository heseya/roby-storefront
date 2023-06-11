<template>
  <NuxtLayout>
    <BaseContainer class="cart-page">
      <div class="cart-page__content">
        <div class="cart-page__cart">
          <h1 class="cart-page__title">
            {{ $t('cart.title') }}
            <ClientOnly>
              <span class="cart-page__subtext">({{ cart.length }})</span>
            </ClientOnly>
          </h1>

          <ClientOnly>
            <div v-if="!isCartEmpty" class="cart-page__list">
              <LazyCartItem
                v-for="item in cart.items"
                :key="item.id"
                :item="(item as any)"
                class="cart-page__item"
              />
            </div>

            <LazyCartEmpty v-else class="cart-page__empty" />
          </ClientOnly>
        </div>

        <div class="cart-page__summary">
          <h2 class="cart-page__title cart-page__title--hideable">{{ t('cart.summary') }}</h2>

          <ClientOnly>
            <CartSummary class="cart-page__summary-box" :disabled="isCartEmpty" />
          </ClientOnly>
        </div>
      </div>

      <ProductSimpleCarousel
        v-if="!isCartEmpty"
        class="cart-page__suggested"
        :query="suggestedQuery"
        :title="t('cart.suggested')"
      />
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "cart": {
      "summary": "Podsumowanie",
      "suggested": "Może Cię zainteresować"
    }
  },
  "en": {
    "cart": {
      "summary": "Summary",
      "suggested": "Might interest you"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'

const cart = useCartStore()
const t = useLocalI18n()
const $t = useGlobalI18n()

const isCartEmpty = computed(() => cart.length === 0)

const suggestedQuery = computed(() => ({
  // TODO: maybe smarter?
  page: Math.ceil(Math.random() * 6),
  limit: 8,
  available: true,
}))

useSeoMeta({
  title: () => $t('cart.title'),
})
</script>

<style lang="scss" scoped>
.cart-page {
  margin-bottom: 50px;

  @media ($viewport-12) {
    margin-top: 90px;
  }

  &__title {
    font-size: rem(26);
    line-height: rem(34);
    font-weight: 600;
    margin-bottom: 16px;

    &--hideable {
      @media ($max-viewport-12) {
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

    @media ($viewport-12) {
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

    @media ($viewport-6) {
      margin-top: 60px;
    }

    @media ($viewport-12) {
      margin-top: 80px;
    }
  }

  &__empty {
    margin-top: 120px;
    margin-bottom: 120px;
  }
}
</style>
