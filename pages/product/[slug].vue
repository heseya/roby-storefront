<template>
  <div class="product-page">
    <div class="product-page__header product-header">
      <ProductPageCover class="product-header__gallery" :media="product?.gallery || []" />

      <div class="product-header__summary">
        <ProductPageFavouriteButton
          v-if="product"
          class="product-header__fav-btn"
          :product-id="product?.id"
        />

        <h1 class="product-header__title">{{ product?.name }}</h1>
        <span class="product-header__subtitle"> {{ productSubtext }} </span>
        <div class="product-header__sales">
          <ProductTag v-for="sale in product?.sales || []" :key="sale.id" type="sale">
            {{ sale.name }}
          </ProductTag>
        </div>

        <LayoutTabs
          class="product-header__tabs"
          type="gray"
          :tabs="[
            { key: 'buy', label: t('tabs.buy') },
            { key: 'renting', label: t('tabs.renting') },
          ]"
        >
          <template #buy> <ProductPagePurchasePanel v-if="product" :product="product" /> </template>
          <template #renting> TODO: wynajem </template>
        </LayoutTabs>
      </div>
    </div>

    <LayoutTabs
      class="product-page__main"
      :tabs="[
        { key: 'description', label: t('tabs.description') },
        { key: 'additionalInfo', label: t('tabs.additionalInfo') },
        { key: 'paperAndInk', label: t('tabs.paperAndInk') },
        { key: 'serviceAndApps', label: t('tabs.serviceAndApps') },
      ]"
    >
      <template #description> TODO opis </template>
    </LayoutTabs>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "notFoundError": "Podany produkt nie istnieje",
    "tabs": {
      "buy": "Zakup",
      "renting": "Zapytaj o wynajem",
      "description": "Opis",
      "additionalInfo": "Dodatkowe informacje",
      "paperAndInk": "Papier i tusze",
      "serviceAndApps": "Serwis i aplikacje"
    }
  }
}
</i18n>

<script setup lang="ts">
import { PRODUCT_SUBTEXT_ATTRIBUTE_NAME } from '@/consts/subtextAttribute'

const heseya = useHeseya()
const route = useRoute()
const t = useLocalI18n()

const { data: product } = useAsyncData('product', async () => {
  try {
    return await heseya.Products.getOneBySlug(route.params.slug as string)
  } catch (e: any) {
    if (e?.response?.status === 404) showError({ message: t('notFoundError'), statusCode: 404 })
    else showError({ message: e.statusCode, statusCode: 500 })
    return null
  }
})

const productSubtext = computed(() => {
  // TODO: do not attribute from fixed string
  return product.value?.attributes.find((a) => a.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME)
    ?.selected_options[0]?.name
})
</script>

<style lang="scss" scoped>
.product-page {
  max-width: $container-width;
  margin: 0 auto;
  padding: $container-padding;

  @media ($viewport-13) {
    padding: 0;
  }

  &__main {
    margin-top: 38px;
  }
}

.product-header {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;

  @media ($viewport-10) {
    grid-gap: 46px;
    grid-template-columns: 1fr 1fr;
  }

  &__fav-btn {
    margin-left: auto;
  }

  &__title {
    font-size: rem(26);
    line-height: rem(34);
    font-weight: 600;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  &__subtitle {
    color: $gray-color-600;
  }

  &__sales {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  &__tabs {
    margin-top: 14px;
  }
}
</style>
