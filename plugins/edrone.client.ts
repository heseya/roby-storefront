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

  const emitEdroneEvent = (event: string, payload: Record<string, string>) => {
    if (!window._edrone) return

    Object.entries(payload).forEach(([key, value]) => {
      window._edrone[key] = value
    })
    window._edrone.action_type = event
    window._edrone?.init?.()
  }

  const bus = useHeseyaEventBus()

  bus.on(HeseyaEvent.ViewProduct, (product) => {
    // @ts-ignore TODO: fix this
    emitEdroneEvent('product_view', { ...product })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    // @ts-ignore TODO: fix this
    emitEdroneEvent('category_view', { ...set, ...items })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    // @ts-ignore TODO: fix this
    emitEdroneEvent('add_to_cart', { ...item })
  })

  bus.on(HeseyaEvent.Purchase, ({ order, items, email }) => {
    // @ts-ignore TODO: fix this
    emitEdroneEvent('order', { order, items, email })
  })
})
