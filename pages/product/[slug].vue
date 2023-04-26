<template>
  <BaseContainer class="product-page">
    <div class="product-page__header product-header">
      <ProductPageCover class="product-header__gallery" :media="product?.gallery || []" />

      <div class="product-header__summary">
        <ClientOnly>
          <ProductPageFavouriteButton
            v-if="product"
            class="product-header__fav-btn"
            :product="product"
          />
        </ClientOnly>

        <h1 class="product-header__title">{{ product?.name }}</h1>
        <span class="product-header__subtitle"> {{ productSubtext }} </span>
        <div class="product-header__sales">
          <ProductTag v-for="sale in product?.sales || []" :key="sale.id" type="sale">
            {{ sale.name }}
          </ProductTag>
        </div>

        <LayoutTabs
          v-if="showPrice"
          class="product-header__tabs"
          type="gray"
          :tabs="[
            { key: 'buy', label: t('tabs.buy') },
            { key: 'renting', label: t('tabs.renting') },
          ]"
        >
          <template #buy> <ProductPagePurchasePanel v-if="product" :product="product" /> </template>
          <template #renting>
            <ProductPageContactForm
              v-if="product"
              :product="product"
              type="renting"
              :action-text="t('tabs.renting')"
            />
          </template>
        </LayoutTabs>

        <div v-else class="product-header__form">
          <ProductPageContactForm
            v-if="product"
            :product="product"
            type="price"
            :action-text="t('tabs.pricing')"
          />
        </div>
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
      <template #description>
        <div class="product-page__description-wrapper">
          <BaseWysiwygContent :content="product?.description_html" />

          <ProductPageAttributeCard v-if="product" :product="product" />
        </div>
      </template>
      <template #additionalInfo>
        <BaseWysiwygContent :content="product?.description_html" />
      </template>
      <template #paperAndInk>
        <BaseWysiwygContent :content="product?.description_html" />
      </template>
      <template #serviceAndApps>
        <BaseWysiwygContent :content="product?.description_html" />
      </template>
    </LayoutTabs>

    <template v-if="product?.sales.length">
      <h2 class="primary-text">Aktualne promocje</h2>
      <div class="product-page__sales">
        <LazyProductPageSale v-for="sale in product?.sales || []" :key="sale.id" :sale="sale" />
      </div>
    </template>
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "notFoundError": "Podany produkt nie istnieje",
    "tabs": {
      "buy": "Zakup",
      "renting": "Zapytaj o wynajem",
      "pricing": "Zapytaj o cenę",
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
import { ASK_FOR_PRICE_KEY } from '@/consts/metadataKeys'

const heseya = useHeseya()
const route = useRoute()
const t = useLocalI18n()

const { data: product } = useAsyncData(`product-${route.params.slug}`, async () => {
  try {
    return await heseya.Products.getOneBySlug(route.params.slug as string)
  } catch (e: any) {
    if (e?.response?.status === 404) showError({ message: t('notFoundError'), statusCode: 404 })
    else showError({ message: e.statusCode, statusCode: 500 })
    return null
  }
})

const category = computed(() => {
  return product.value?.sets[0]
})

useBreadcrumbs([
  category.value
    ? { label: category.value.name || '', link: `/category/${category.value.slug}` }
    : null,
  { label: product.value?.name || '', link: route.fullPath },
])

useHead({
  title: computed(() => product.value?.name || ''),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: computed(() => product.value?.description_short || ''),
    },
  ],
})

const productSubtext = computed(() => {
  // TODO: do not attribute from fixed string
  return product.value?.attributes.find((a) => a.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME)
    ?.selected_options[0]?.name
})

const showPrice = computed(() => {
  return !product.value?.metadata?.[ASK_FOR_PRICE_KEY] ?? true
})
</script>

<style lang="scss" scoped>
.product-page {
  &__main {
    margin-top: 38px;
  }

  &__description-wrapper {
    display: flex;
    gap: 16px;
    flex-direction: column-reverse;

    @media ($viewport-8) {
      flex-direction: row;
    }

    > * {
      width: 100%;
    }
  }

  &__sales {
    display: flex;
    gap: 16px;
    margin-top: 16px;
    width: 100%;
    overflow: auto;
    padding-bottom: 8px;
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

  &__form {
    margin-top: 14px;
    background-color: $gray-color-100;
    padding: 16px;
  }
}
</style>
