<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer class="product-page">
      <div
        class="product-page__header product-header"
        :class="{ 'product-header--singular-cover': (product?.gallery?.length ?? 0) < 2 }"
      >
        <ProductPageCover
          class="product-header__gallery"
          :media="product?.gallery || []"
          :tags="product?.tags || []"
        />

        <div class="product-header__summary">
          <LazyProductPageFavouriteButton
            v-if="product"
            class="product-header__fav-btn"
            :product="product"
          />

          <h1 class="product-header__title">{{ product?.name }}</h1>

          <span class="product-header__subtitle">
            {{ getProductSubtext(product, config.productSubtextAttr) }}
          </span>

          <div
            v-if="attributesSummaryHtml"
            class="product-header__attributes"
            v-html="attributesSummaryHtml"
          ></div>

          <div class="product-header__sales">
            <ProductTag v-for="sale in visibleSales" :key="sale.id" type="sale">
              {{ sale.name }}
            </ProductTag>
          </div>

          <LayoutTabs
            class="product-header__tabs"
            type="gray"
            hide-single-tab
            :tabs="productPurchaseTabs"
          >
            <template #buy>
              <LazyProductPageContactForm
                v-if="product && product?.metadata?.[ASK_FOR_PRICE_KEY]"
                :product="product"
                :description="t('priceFormInfo')"
                type="price"
                :action-text="$t('offers.pricing')"
              />
              <ProductPagePurchasePanel v-else-if="product" :product="product" />
            </template>
            <template #renting>
              <LazyProductPageContactForm
                v-if="product"
                :product="product"
                :description="t('priceFormInfo')"
                type="renting"
                :action-text="$t('offers.renting')"
              />
            </template>
          </LayoutTabs>
        </div>
      </div>

      <ProductPageBanner
        v-if="product?.banner"
        class="product-page__banner"
        :banner="product.banner"
      />

      <LayoutTabs class="product-page__main" :tabs="productDescriptionTabs">
        <template #description>
          <div class="product-page__description-wrapper">
            <div>
              <LayoutDropDownContainer :min-expand-height="productDescriptionExpandHeight">
                <LazyBaseWysiwygContent :content="product?.description_html" />
              </LayoutDropDownContainer>

              <LazyProductPageAttachments
                v-if="product?.attachments.length"
                :attachments="product?.attachments"
                class="product-page__attachments"
              />
            </div>

            <ProductPageCard
              v-if="product?.metadata.allow_individual_offer"
              :title="t('individualOffer')"
            >
              <LazyProductPageContactForm
                :product="product"
                vertical
                type="offer"
                :action-text="t('individualOffer')"
              />
            </ProductPageCard>
            <LazyProductPageAttributeCard
              v-else-if="product && showAttributeCard"
              :product="product"
            />
          </div>
        </template>

        <template #additionalInfo>
          <LazyProductPageAttributes v-if="product" :product="product" />
        </template>

        <template v-for="page in globalPages" :key="page.id" #[page.slug]>
          <LazyBaseWysiwygContent :content="page?.content_html" />
        </template>

        <template
          v-for="page in product?.descriptions"
          :key="page.id"
          #[`description-${page.slug}`]
        >
          <LazyProductPageAdditionalDescription :page="page" />
        </template>
      </LayoutTabs>

      <IntegrationEkomiProductWidget
        v-if="product?.id"
        :token="ekomi.miniStarsToken"
        :product-id="product.id"
      />
      <IntegrationEkomiProductWidget
        v-if="product?.id"
        :token="ekomi.reviewsToken"
        :product-id="product.id"
      />

      <template v-if="visibleSales.length">
        <h2 class="primary-text">
          {{ t('salesTitle') }}
          <span class="gray-600-text" :style="{ fontWeight: 400 }">
            ({{ visibleSales.length }})
          </span>
        </h2>
        <div class="product-page__sales">
          <LazyProductPageSale v-for="sale in visibleSales" :key="sale.id" :sale="sale" />
        </div>
      </template>

      <LazyHomeProductCarousel
        v-for="set in relatedSets"
        :key="set.id"
        class="product-page__related-products"
        :category="set"
        without-subcategories
        hide-more-button
      />
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "notFoundError": "Podany produkt nie istnieje",
    "tabs": {
      "buy": "Zakup",
      "description": "Opis",
      "additionalInfo": "Dodatkowe informacje"
    },
    "individualOffer": "Zapytaj o indywidualną ofertę",
    "salesTitle": "Aktualne promocje",
    "priceFormInfo": "Wypełnienie formularza zajmie tylko chwilę, a dzięki temu otrzymasz od nas wsparcie w wyborze urządzenia i ofertę dopasowaną do Twoich potrzeb."
  },
  "en": {
    "notFoundError": "The specified product doesnt exist",
    "tabs": {
      "buy": "Purchase",
      "description": "Description",
      "additionalInfo": "Additional information"
    },
    "individualOffer": "Ask for individual offer",
    "salesTitle": "Current promotions",
    "priceFormInfo": "Filling out the form will only take a moment, and thanks to this you will receive support from us in choosing the device and an offer tailored to your needs."
  }
}
</i18n>

<script setup lang="ts">
import { HeseyaEvent } from '@heseya/store-core'

import {
  ALLOW_RENTING_KEY,
  ASK_FOR_PRICE_KEY,
  PRODUCT_SET_SHOW_AS_VARIANT,
} from '@/consts/metadataKeys'
import { Tab } from '@/components/layout/Tabs.vue'

import { useConfigStore } from '@/store/config'

const { ekomi } = usePublicRuntimeConfig()
const heseya = useHeseya()
const route = useRoute()
const config = useConfigStore()
const t = useLocalI18n()
const $t = useGlobalI18n()
const i18n = useI18n()

const { data: product } = useAsyncData(`product-${route.params.slug}`, async () => {
  try {
    return await heseya.Products.getOneBySlug(route.params.slug as string)
  } catch (e: any) {
    if (e?.response?.status === 404 || e?.response?.status === 406)
      showError({ message: t('notFoundError'), statusCode: e?.response?.status })
    else showError({ message: e.statusCode, statusCode: e?.response?.status || 500 })
    return null
  }
})

const { data: globalPages } = useAsyncData('globalPages', async () => {
  const { data } = await heseya.Pages.get({ metadata: { show_near_products: true } })
  return Promise.all(data.map((p) => heseya.Pages.getOne(p.id)))
})

const category = computed(() => product.value?.sets[0])

const productPurchaseTabs = computed(
  () =>
    [
      { key: 'buy', label: t('tabs.buy') },
      product.value?.metadata[ALLOW_RENTING_KEY]
        ? { key: 'renting', label: $t('offers.renting'), highlighted: true }
        : null,
    ].filter(Boolean) as Tab[],
)

const productDescriptionTabs = computed<Tab[]>(() => {
  // This prevent to set active tab to globalPages when product is not loaded yet
  if (!product.value) return []

  return [
    ...(product.value?.description_html
      ? [{ key: 'description', label: t('tabs.description') }]
      : []),
    ...(product.value?.attributes.length
      ? [{ key: 'additionalInfo', label: t('tabs.additionalInfo') }]
      : []),
    ...(product.value?.descriptions
      .filter((p) => p.public)
      .map((p) => ({ key: `description-${p.slug}`, label: p.name })) || []),
    ...(globalPages.value?.map((p) => ({ key: p.slug, label: p.name })) || []),
  ]
})

const productDescriptionExpandHeight = computed(() =>
  config.env.product_description_expand_height
    ? parseInt(config.env.product_description_expand_height.toString())
    : 700,
)

const breadcrumbs = computed(() => [
  category.value
    ? { label: category.value.name || '', link: `/category/${category.value.slug}` }
    : null,
  { label: product.value?.name || '', link: route.fullPath },
])

const showAttributeCard = computed(() => {
  const config = useConfigStore()
  return product.value?.attributes.length && config.env.show_attribute_card === '1'
})

const visibleSales = computed(() =>
  (product.value?.sales || []).filter((sale) => sale.metadata.show_on_product_page),
)

const relatedSets = computed(
  () =>
    product.value?.related_sets?.filter((set) => !set.metadata[PRODUCT_SET_SHOW_AS_VARIANT]) || [],
)

const attributesSummaryHtml = computed(() =>
  product.value?.metadata[`attributes_summary_${i18n.locale.value}`]?.toString(),
)

delayedOnMounted(() => {
  const ev = useHeseyaEventBus()

  watch(
    product,
    (p) => {
      if (p) ev.emit(HeseyaEvent.ViewProduct, p)
    },
    { immediate: true },
  )
})

useSeo(() => [
  product.value?.seo,
  { title: product.value?.name, og_image: product.value?.cover || undefined },
])

useProductJsonLd(product)
</script>

<style lang="scss" scoped>
.product-page {
  &__main {
    margin-top: 38px;
  }

  &__banner {
    margin-top: 38px;
    margin-bottom: -24px;
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

  &__related-products {
    margin-top: 32px;
  }

  &__attachments {
    margin-top: 40px;
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

  &--singular-cover {
    @media ($viewport-10) {
      grid-template-columns: 1fr 1.4fr;
    }
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

  &__attributes {
    font-size: rem(12);
    line-height: rem(16);
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
