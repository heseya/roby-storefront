import { Page, Product, parsePrices } from '@heseya/store-core'
import { WithContext, Product as ProductSchema, Thing, BlogPosting, WebPage } from 'schema-dts'

import { MaybeRef } from '@vueuse/core'
import { TranslatedBlogArticle } from '~/interfaces/BlogArticle'

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

    const schema: WithContext<ProductSchema> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      image: product.gallery.map((m) => m.url),
      name: product.name,
      description: product.seo?.description || '',
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

    return schema
  })

  useJsonLd(jsonLd)
}

export const useBlogJsonLd = (articleRef?: MaybeRef<TranslatedBlogArticle | null>) => {
  const { appHost, directusUrl } = usePublicRuntimeConfig()

  const jsonLd = computed<WithContext<BlogPosting>>(() => {
    const article = unref(articleRef)
    if (!article) return {} as WithContext<BlogPosting>

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.seo_title || article.title,
      image: `${directusUrl}/assets/${article.cover_image || article.image}`,
      editor: `${article.user_created?.first_name} ${article.user_created?.last_name}`,
      keywords: article.metatags?.split(',').join(' ') || '',
      url: `${appHost}/${article.slug}`,
      datePublished: article.date_created,
      dateCreated: article.date_created,
      dateModified: article.date_updated || article.date_created,
      description: article.seo_description || article.description,
      articleBody: article.content,
      author: {
        '@type': 'Person',
        name: `${article.user_created?.first_name} ${article.user_created?.last_name}`,
      },
    }
  })

  useJsonLd(jsonLd)
}

export const usePageJsonLd = (pageRef?: MaybeRef<Page | null>) => {
  const jsonLd = computed<WithContext<WebPage>>(() => {
    const article = unref(pageRef)
    if (!article) return {} as WithContext<WebPage>

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: article.seo?.title || article.name,
      description: article.seo?.description,
    }
  })

  useJsonLd(jsonLd)
}
