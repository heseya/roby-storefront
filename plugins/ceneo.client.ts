import { HeseyaEvent } from '@heseya/store-core'

export default defineNuxtPlugin(() => {
  const { ceneoGuid } = usePublicRuntimeConfig()

  if (!ceneoGuid) return

  useHead({
    script: [
      {
        hid: 'ceneo',
        defer: true,
        children: `
(function(w,d,s,i,dl){w._ceneo = w._ceneo || function () {
w._ceneo.e = w._ceneo.e || []; w._ceneo.e.push(arguments); };
w._ceneo.e = w._ceneo.e || [];dl=dl===undefined?"dataLayer":dl;
const f = d.getElementsByTagName(s)[0], j = d.createElement(s);
j.defer = true;
j.src = "https://ssl.ceneo.pl/ct/v5/script.js?accountGuid=" + i + "&t=" +
Date.now() + (dl ? "&dl=" + dl : ''); f.parentNode.insertBefore(j, f);
})(window, document, "script", "${ceneoGuid}");
        `,
      },
    ],
  })

  const bus = useHeseyaEventBus()

  bus.on(HeseyaEvent.Purchase, ({ order, items, email }) => {
    window?._ceneo?.('transaction', {
      client_email: email,
      order_id: order.code,
      shop_products: items.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.totalQty,
        currency: 'PLN',
      })),
      amount: order.summary,
    })
  })
})
