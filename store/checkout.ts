import {
  Address,
  CartItem,
  HeseyaEvent,
  OrderCreateDto,
  ShippingMethod,
  ShippingType,
} from '@heseya/store-core'
import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { Paczkomat } from '~~/interfaces/Paczkomat'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    email: '',
    comment: '',
    shippingAddress: null as Address | null,
    billingAddress: null as Address | null,
    shippingMethod: null as ShippingMethod | null,
    digitalShippingMethod: null as ShippingMethod | null,
    paczkomat: null as Paczkomat | null,
    invoiceRequested: false,
    paymentMethodId: null as string | null,
  }),

  getters: {
    orderDto(): OrderCreateDto | null {
      const cart = useCartStore()
      if (!(this.shippingAddress || this.billingAddress)) return null
      return {
        email: this.email,
        comment: this.comment,
        shipping_place: this.shippingAddress ?? undefined,
        items: cart.orderItems,
        shipping_method_id: this.shippingMethod?.id,
        digital_shipping_method_id: this.digitalShippingMethod?.id,
        invoice_requested: !!this.invoiceRequested,
        billing_address: this.billingAddress || this.shippingAddress!,
        coupons: cart.coupons.map((c) => c.code),
        sales_ids: cart.sales.map((s) => s.id),
      }
    },

    isShippingAddressValid(state): boolean {
      return isAddressValid(state.shippingAddress)
    },
  },

  actions: {
    reset() {
      this.email = ''
      this.comment = ''
      this.shippingAddress = null
      this.billingAddress = null
      this.shippingMethod = null
      this.digitalShippingMethod = null
      this.invoiceRequested = false
      this.paczkomat = null
    },

    async attachDigitalShippingMethod() {
      const heseya = useHeseya()
      const cart = useCartStore()

      if (getShippingTypeFromCart(cart.items as CartItem[]) === OrderShippingType.Default) return

      const { data: methods } = await heseya.ShippingMethods.get()
      const digitalShippingMethods = methods.filter((m) => m.shipping_type === ShippingType.Digital)
      if (!digitalShippingMethods.length)
        throw new Error(
          'Store does not have configured digital shipping method, which is required to make an order.',
        )
      this.digitalShippingMethod = digitalShippingMethods[0]
    },

    async createOrder() {
      const cart = useCartStore()
      const heseya = useHeseya()
      const ev = useHeseyaEventBus()

      if (!this.orderDto) throw new Error('Order cannot be made, because data is invalid')

      const order = await heseya.Orders.create(this.orderDto)

      ev.emit(HeseyaEvent.Purchase, { order, items: cart.items as CartItem[] })

      return order
    },

    async createOrderPayment(orderCode: string) {
      const heseya = useHeseya()
      const { order, paymentMethods } = await heseya.Orders.getPaymentMethods(orderCode)

      if (!order.payable) throw new Error('Order is not payable')
      if (!paymentMethods.length) throw new Error('No payment methods available')

      const orderShippingType = getOrderShippingType(order)

      // TODO: create this env variable
      const paymentUrl = await heseya.Orders.pay(
        orderCode,
        paymentMethods[0].id,
        `${process.env.appHost}/checkout/thank-you?code=${orderCode}&t=${orderShippingType}`,
      )

      return paymentUrl
    },
  },

  persist: true,
})
