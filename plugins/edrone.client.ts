import { HeseyaEvent } from '@heseya/store-core'
import type { Product, ProductListed } from '@heseya/store-core'

export default defineNuxtPlugin(() => {
  const config = usePublicRuntimeConfig()
  if (!config.edroneId) return

  useHead({
    script: [
      {
        hid: 'edrone',
        defer: true,
        children: `
(function (srcjs) {
  window._edrone = window._edrone || {};
  _edrone.app_id = '${config.edroneId}';
  _edrone.platform = '${config.i18n.baseUrl}';
  var doc = document.createElement('script');
  doc.type = 'text/javascript';
  doc.async = true;
  doc.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + srcjs;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(doc, s);
})("//d3bo67muzbfgtl.cloudfront.net/edrone_2_0.js?app_id=${config.edroneId}");
        `,
      },
    ],
  })

  const bus = useHeseyaEventBus()
  const { emit: emitEdroneEvent } = useEdrone()

  bus.on(HeseyaEvent.ViewContent, (data: any) => {
    /**
     * https://docs.edrone.me/sending-data-client.html#homepage-view
     */
    if (data?.contentType === 'homepage') return emitEdroneEvent('homepage_view', {})

    /**
     * https://docs.edrone.me/sending-data-client.html#category-view
     */
    if (data?.contentType === 'product-set')
      return emitEdroneEvent('category_view', {
        product_category_ids: data?.contentId,
        product_category_names: data?.contentName,
      })
  })

  /**
   * https://docs.edrone.me/sending-data-client.html#product-view
   */
  bus.on(HeseyaEvent.ViewProduct, (product) => {
    emitEdroneEvent('product_view', {
      product_skus: '', // TODO: add sku
      product_ids: product.id,
      product_titles: product.name,
      product_images: product.gallery.map((image) => image.url).join('|'),
      product_urls: `${config.i18n.baseUrl}/product/${product.slug}}`,
      product_availability: product.available ? 1 : 0,
      product_category_ids: product.sets.map((set) => set.id).join('|'),
      product_category_names: product.sets.map((set) => set.name).join('|'),
    })
  })

  /**
   * https://docs.edrone.me/sending-data-client.html#add-to-cart
   */
  bus.on(HeseyaEvent.AddToCart, (item) => {
    const product = item.product as Product | ProductListed

    emitEdroneEvent('add_to_cart', {
      product_skus: '', // TODO: add sku
      product_ids: product?.id,
      product_titles: product.name,
      product_images:
        'gallery' in product ? product.gallery.map((image: any) => image.url).join('|') : '',
      product_urls: `${config.i18n.baseUrl}/product/${product.slug}}`,
      product_availability: product.available ? 1 : 0,
      product_category_ids:
        'sets' in product ? product.sets.map((set: any) => set.id).join('|') : '',
      product_category_names:
        'sets' in product ? product.sets.map((set: any) => set.name).join('|') : '',
    })
  })

  /**
   * https://docs.edrone.me/sending-data-client.html#order
   */
  bus.on(HeseyaEvent.Purchase, (order) => {
    const address =
      order.shipping_place && typeof order.shipping_place !== 'string'
        ? order.shipping_place
        : order.billing_address

    const [firstName, lastName] = address.name.split(' ')

    emitEdroneEvent('order', {
      email: order.email,
      first_name: firstName,
      last_name: lastName || '',
      // subscriber_status: '', // subscriber status is unknown
      product_skus: '', // TODO: add sku
      product_ids: order.products.map((item) => item.product.id).join('|'),
      product_titles: order.products.map((item) => item.name).join('|'),
      product_images: order.products.map((item) => item.product.cover?.url).join('|'),
      product_urls: order.products
        .map((item) => `${config.i18n.baseUrl}/product/${item.product.slug}}`)
        .join('|'),
      product_category_ids: order.products
        .flatMap((item) => item.product.sets.map((set) => set.id))
        .join('|'),
      product_category_names: order.products
        .flatMap((item) => item.product.sets.map((set) => set.name))
        .join('|'),
      product_counts: order.products.map((item) => item.quantity).join('|'),
      order_id: order.code,
      country: address.country,
      city: address.city,
      base_currency: order.currency,
      order_currency: order.currency,
      base_payment_value: order.summary,
      order_payment_value: order.summary,
    })
  })
})
