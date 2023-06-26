<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer class="product-page">
      <div class="product-page__header product-header">
        <ProductPageCover
          class="product-header__gallery"
          :media="product?.gallery || []"
          :tags="product?.tags || []"
        />

        <div class="product-header__summary">
          <ClientOnly>
            <ProductPageFavouriteButton
              v-if="product"
              class="product-header__fav-btn"
              :product="product"
            />
          </ClientOnly>

          <h1 class="product-header__title">{{ product?.name }}</h1>
          <span class="product-header__subtitle"> {{ getProductSubtext(product) }} </span>
          <div class="product-header__sales">
            <ProductTag v-for="sale in product?.sales || []" :key="sale.id" type="sale">
              {{ sale.name }}
            </ProductTag>
          </div>

          <LayoutTabs
            v-if="showPrice"
            class="product-header__tabs"
            type="gray"
            hide-single-tab
            :tabs="productPurchaseTabs"
          >
            <template #buy>
              <ProductPagePurchasePanel v-if="product" :product="product" />
            </template>
            <template #renting>
              <LazyProductPageContactForm
                v-if="product"
                :product="product"
                type="renting"
                :action-text="$t('offers.renting')"
              />
            </template>
          </LayoutTabs>

          <div v-else class="product-header__form">
            <LazyProductPageContactForm
              v-if="product"
              :product="product"
              type="price"
              :action-text="$t('offers.pricing')"
            />
          </div>
        </div>
      </div>

      <KeepAlive>
        <LayoutTabs class="product-page__main" :tabs="productDescriptionTabs">
          <template #description>
            <div class="product-page__description-wrapper">
              <div>
                <LayoutDropDownContainer>
                  <LazyBaseWysiwygContent :content="product?.description_html" />
                </LayoutDropDownContainer>

                <LazyProductPageAttachments
                  v-if="product?.attachments.length"
                  :attachments="product?.attachments"
                  class="product-page__attachments"
                />
              </div>

              <LazyProductPageAttributeCard
                v-if="product && product.attributes.length"
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
      </KeepAlive>

      <template v-if="product?.sales.length">
        <h2 class="primary-text">
          {{ t('salesTitle') }}
          <span class="gray-600-text" :style="{ fontWeight: 400 }">
            ({{ product?.sales.length }})
          </span>
        </h2>
        <div class="product-page__sales">
          <LazyProductPageSale v-for="sale in product?.sales || []" :key="sale.id" :sale="sale" />
        </div>
      </template>

      <ProductSimpleCarousel
        v-for="set in product?.related_sets || []"
        :key="set.id"
        class="product-page__related-products"
        :title="set.name"
        :query="{ sets: [set.slug], sort: `set.${set.slug}` }"
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
    "salesTitle": "Aktualne promocje"
  },
  "en": {
    "notFoundError": "The specified product doesnt exist",
    "tabs": {
      "buy": "Purchase",
      "description": "Description",
      "additionalInfo": "Additional information"
    },
    "salesTitle": "Current promotions"
  }
}
</i18n>

<script setup lang="ts">
import { HeseyaEvent } from '@heseya/store-core'
import { ASK_FOR_PRICE_KEY } from '@/consts/metadataKeys'
import { Tab } from '@/components/layout/Tabs.vue'
import { getProductSubtext } from '@/utils/product'

const ev = useHeseyaEventBus()
const heseya = useHeseya()
const route = useRoute()
const t = useLocalI18n()
const $t = useGlobalI18n()

const { data: product } = useAsyncData(`product-${route.params.slug}`, async () => {
  try {
    return await heseya.Products.getOneBySlug(route.params.slug as string)
  } catch (e: any) {
    if (e?.response?.status === 404) showError({ message: t('notFoundError'), statusCode: 404 })
    else showError({ message: e.statusCode, statusCode: 500 })
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
      product.value?.metadata.allow_renting
        ? { key: 'renting', label: $t('offers.renting') }
        : null,
    ].filter(Boolean) as Tab[],
)

const productDescriptionTabs = computed<Tab[]>(() => [
  { key: 'description', label: t('tabs.description') },
  ...(product.value?.attributes.length
    ? [{ key: 'additionalInfo', label: t('tabs.additionalInfo') }]
    : []),
  ...(product.value?.descriptions
    .filter((p) => p.public)
    .map((p) => ({ key: `description-${p.slug}`, label: p.name })) || []),
  ...(globalPages.value?.map((p) => ({ key: p.slug, label: p.name })) || []),
])

const breadcrumbs = computed(() => [
  category.value
    ? { label: category.value.name || '', link: `/category/${category.value.slug}` }
    : null,
  { label: product.value?.name || '', link: route.fullPath },
])

onMounted(() => {
  watch(
    product,
    (p) => {
      if (p) ev.emit(HeseyaEvent.ViewProduct, p)
    },
    { immediate: true },
  )
})

useSeo(() => [product.value?.seo, { title: product.value?.name }])

useProductJsonLd(product)

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
