<template>
  <LayoutModal v-model:open="isModalVisible" :box="isWide" :fullscreen="true">
    <div class="product-upsell-modal">
      <div class="product-upsell-modal__header">
        <LayoutIcon :icon="CheckIcon" :size="isWide ? 26 : 48" />
        <span class="product-upsell-modal__header-title">{{ t('header.title') }}</span>
      </div>
      <div class="product-upsell-modal__product">
        <Media
          class="product-upsell-modal__product-image"
          object-fit="cover"
          :media="product.cover"
        />
        <div class="product-upsell-modal__product-details">
          <span class="product-upsell-modal__product-name">{{ product.name }}</span>
          <span class="product-upsell-modal__product-price"> {{ price }} {{ currency }} </span>
        </div>
      </div>
      <div class="product-upsell-modal__upsell">
        <div class="product-upsell-modal__upsell-header">
          <span class="product-upsell-modal__upsell-text">{{ t('upsell.text') }}</span>
          <span class="product-upsell-modal__upsell-subtext">{{ t('upsell.subtext') }}</span>
        </div>
        <div class="product-upsell-modal__upsell-content">
          <ProductSimpleCarousel
            :query="suggestedQuery"
            class="product-upsell-modal__upsell-carousel"
          />
        </div>
        <div class="product-upsell-modal__upsell-buttons">
          <button
            class="product-upsell-modal__upsell-buttons-back"
            @click="isModalVisible = !isModalVisible"
          >
            <LayoutIcon :icon="GoBackIcon" :size="14" />
            {{ t('buttons.back') }}
          </button>
          <NuxtLink :to="localePath('/cart')">
            <LayoutButton variant="primary">{{ t('buttons.cart') }}</LayoutButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </LayoutModal>
</template>

<i18n lang="json">
{
  "pl": {
    "header": {
      "title": "Produkt dodany do koszyka"
    },
    "upsell": {
      "text": "Przydatne akcesoria",
      "subtext": "Dobierz do swojego zestawu"
    },
    "buttons": {
      "back": "Powrót do zakupów",
      "cart": "Przejdź do koszyka"
    }
  },
  "en": {
    "header": {
      "title": "Product has been added to cart"
    },
    "upsell": {
      "text": "Usefull accessories",
      "subtext": "Match it to your set"
    },
    "buttons": {
      "back": "Continue to shopping",
      "cart": "Go to cart"
    }
  }
}
</i18n>

<script setup lang="ts">
import { Product } from '@heseya/store-core'
import CheckIcon from '@/assets/icons/check-circle.svg?component'
import GoBackIcon from '@/assets/icons/navigate-back.svg?component'
import { useConfigStore } from '~/store/config'

const t = useLocalI18n()
const localePath = useLocalePath()
const config = useConfigStore()

const props = withDefaults(
  defineProps<{
    product: Product
    price: number
    currency: string
    open: boolean
  }>(),
  {},
)
const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
}>()

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})

const suggestedQuery = computed(() => {
  return {
    sets: [config.env.cart_upsell_set_slug as string],
  }
})

if (process.browser) {
  const innerWidth = ref(window.innerWidth)
}

const isWide = computed(() => {
  return typeof innerWidth !== 'undefined' ? innerWidth >= 1024 : false
})
</script>

<style lang="scss" scoped>
.product-upsell-modal {
  padding: 18px 0;
  width: 100%;
  background-color: $gray-color-100;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 140px;

    @media ($viewport-10) {
      padding: 0 21px;
      flex-direction: row;
    }

    &-title {
      margin-left: 15px;
      font-size: rem(20);
      font-weight: $font-weight-medium;
      padding-top: 20px;

      @media ($viewport-10) {
        padding-top: 0;
      }
    }
  }

  &__product {
    background-color: #fff;
    display: flex;
    border: 1px solid $gray-color-300;
    width: 90%;
    padding: 16px 21px;
    margin: 16px 16px;

    @media ($viewport-10) {
      margin: 16px 0;
      width: 100%;
    }

    &-image {
      max-height: 48px;
      max-width: 48px;
      border: 1px solid $gray-color-300;
    }

    &-details {
      display: flex;
      flex-direction: column;
      margin-left: 18px;
    }

    &-name {
      font-size: rem(14);
    }

    &-price {
      color: $gray-color-600;
    }
  }

  &__upsell {
    margin-top: 144px;
    padding: 0 21px;

    @media ($viewport-10) {
      margin-top: 20px;
    }

    &-header {
      display: flex;
      flex-direction: column;
    }

    &-text {
      font-weight: $font-weight-medium;
    }

    &-subtext {
      color: $gray-color-600;
    }

    &-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 60px;

      @media ($viewport-10) {
        margin-top: 0;
      }

      &-back {
        cursor: pointer;
        border: unset;
        background-color: unset;
        display: flex;
        align-self: center;
        color: $gray-color-600;
      }
    }
  }
}
</style>
