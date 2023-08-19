import { Product, parsePrices } from '@heseya/store-core'
import { WithContext, Product as ProductSchema, Thing } from 'schema-dts'

import { MaybeRef } from '@vueuse/core'

export const useJsonLd = <T extends MaybeRef<WithContext<Thing>>>(schema: T) => {
  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(unref(schema)),
      },
    ],
  }))
}

export const useProductJsonLd = (productRef?: MaybeRef<Product | null>) => {
  const { appHost } = usePublicRuntimeConfig()
  const currency = useCurrency()

  const jsonLd = computed<WithContext<ProductSchema>>(() => {
    const product = unref(productRef)
    if (!product) return {} as WithContext<ProductSchema>

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      image: product.gallery.map((m) => m.url),
      name: product.name,
      description: product.seo?.description ?? product.description_short,
      // sku: p.metadata.ean?.toString(),
      offers: {
        '@type': 'Offer',
        url: `${appHost}/produkt/${product.slug}`,
        priceCurrency: currency.value,
        price: parsePrices(product.prices_min, currency.value),
        availability: product.available
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
      },
    }
  })

  useJsonLd(jsonLd)
}
