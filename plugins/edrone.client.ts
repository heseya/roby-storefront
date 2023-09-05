import { HeseyaEvent } from '@heseya/store-core'

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
  _edrone.platform = '${config.appHost}';
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

  const emitEdroneEvent = (event: string, payload: Record<string, string | number>) => {
    if (!window._edrone) return

    Object.entries(payload).forEach(([key, value]) => {
      window._edrone[key] = value
    })
    window._edrone.action_type = event
    window._edrone?.init?.()
  }

  const bus = useHeseyaEventBus()

  /**
   * https://docs.edrone.me/sending-data-client.html#product-view
   */
  bus.on(HeseyaEvent.ViewProduct, (product) => {
    emitEdroneEvent('product_view', {
      product_skus: '', // TODO: add sku
      product_ids: product.id,
      product_titles: product.name,
      product_images: product.gallery.map((image) => image.url).join('|'),
      product_urls: `${config.appHost}/product/${product.slug}}`,
      product_availability: product.available ? 1 : 0,
      product_category_ids: product.sets.map((set) => set.id).join('|'),
      product_category_names: product.sets.map((set) => set.name).join('|'),
    })
  })

  /**
   * https://docs.edrone.me/sending-data-client.html#category-view
   */
  bus.on(HeseyaEvent.ViewProductList, ({ set }) => {
    if (set && set.id && set.name)
      emitEdroneEvent('category_view', {
        product_category_ids: set.id,
        product_category_names: set.name,
      })
  })

  /**
   * https://docs.edrone.me/sending-data-client.html#add-to-cart
   */
  bus.on(HeseyaEvent.AddToCart, (_item) => {
    emitEdroneEvent('add_to_cart', {})
  })

  /**
   * https://docs.edrone.me/sending-data-client.html#order
   */
  bus.on(HeseyaEvent.Purchase, ({ order, items, email }) => {
    // @ts-ignore TODO: fix this
    emitEdroneEvent('order', {
      email,
      first_name: '',
      last_name: '',
      subscriber_status: '',
      product_skus: '',
      product_ids: items.map((item) => item.productId).join('|'),
      product_titles: items.map((item) => item.name).join('|'),
      product_images: items.map((item) => item.coverUrl).join('|'),
      product_urls: items // @ts-ignore TODO: fix this
        .map((item) => `${config.appHost}/product/${item.product.slug}}`)
        .join('|'),
      product_category_ids: '',
      product_category_names: '',
      product_counts: items.map((item) => item.totalQty).join('|'),
      order_id: order.code,
      country: '',
      city: '',
      base_currency: '',
      order_currency: '',
      base_payment_value: order.summary,
      order_payment_value: order.summary,
    })
  })
})
